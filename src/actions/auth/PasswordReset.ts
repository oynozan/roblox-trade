"use server";

import userDB from "@/models/User";
import MongoConnect from "@/lib/db";
import { sendMail } from "@/lib/email";
import { GetUserByEmail } from "./User";
import { Encryption } from "@/lib/encryption";

interface IRequests {
    [key: string]: number; // Miliseconds
}
const requests: IRequests = {};

interface IRetries {
    [key: string]: {
        count: number;
        timestamp: number;
    };
}
const retries: IRetries = {};
const maxRetries = 5;

const ONE_HOUR = 3600000;
const FIVE_MINUTES = 300000;

export async function SendPasswordReset(email: string) {
    RequestCleaner();

    // Check if an email has been sent in the last 5 minutes
    if (requests[email]) return { error: "Please wait 5 minutes before retrying" };

    await MongoConnect();

    // Get user
    const user = await GetUserByEmail(email);
    if (!user) return { error: "User not found" };

    // Create a 6 number long password reset code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email with password reset link
    if (process.env.NODE_ENV === "production") {
        try {
            requests[email] = Date.now();
            await sendMail("Password Reset", email, `Your password reset code is: ${code}`);
        } catch (error) {
            console.error(error);
            return { error: "Failed to send email" };
        }
    }

    // Update user passwordCode
    await userDB.updateOne({ email }, { passwordCode: code });

    return { success: true };
}

export async function ValidatePasswordReset({
    email,
    code,
    oldPassword,
    newPassword,
}: {
    email: string;
    code: string;
    oldPassword: string;
    newPassword: string;
}) {
    RetryCleaner();

    const now = Date.now();

    // Check if user has reached max retries
    if (retries?.[email] && retries[email].count >= maxRetries) {
        retries[email].timestamp = now;
        return { error: "Max retries reached, please try again later" };
    }

    // Check if reset is delayed
    if (retries[email] && retries[email].timestamp + FIVE_MINUTES > now) {
        return { error: "Please wait 5 minutes before retrying" };
    }

    if (!retries[email]) retries[email] = { count: 0, timestamp: Date.now() };
    retries[email].count++;

    await MongoConnect();

    // Get user
    const user = await GetUserByEmail(email);
    if (!user) return { error: "User not found" };

    // Get password code
    const passwordDoc = await userDB.findOne({ email: user.email }, { passwordCode: 1, password: 1 });
    const passwordCode = passwordDoc?.passwordCode;

    // Check if code is valid
    if (passwordCode !== code) return { error: "Invalid code" };

    // Check if old password is correct
    const isValidPassword = await Encryption.comparePasswords(oldPassword, passwordDoc.password);
    if (!isValidPassword) return { error: "Invalid password" };

    // Encrypt new password
    const password = await Encryption.createPassword(newPassword);

    // Update user password
    await userDB.updateOne({ email }, { password, passwordCode: null });

    return { success: true };
}

function RequestCleaner() {
    for (const email in requests) {
        if (requests[email] + FIVE_MINUTES < Date.now()) {
            delete requests[email];
        }
    }
}

function RetryCleaner() {
    for (const email in retries) {
        if (retries[email].timestamp + ONE_HOUR < Date.now()) {
            delete retries[email];
        }
    }
}
