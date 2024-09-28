"use server";

import { cookies } from 'next/headers';

import userDB from "@/models/User";
import MongoConnect from "@/lib/db";
import { sendMail } from "@/lib/email";
import { GetUserByEmail } from "./User";
import { Encryption } from '@/lib/encryption';

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

const FIVE_MINUTES = 300000;

export async function SendActivation(email: string) {
    RequestCleaner();

    // Check if an email has been sent in the last 5 minutes
    if (requests[email]) return { error: "Please wait 5 minutes before retrying" };

    await MongoConnect();

    // Check if email is valid
    const user = await GetUserByEmail(email);
    if (!user) return { error: "User not found" };

    // Create a 6 number long activation code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email with activation code
    if (process.env.NODE_ENV === "production") {
        try {
            requests[email] = Date.now();
            await sendMail("Activation", email, `Your activation code is: ${code}`);
        } catch (error) {
            console.error(error);
            return { error: "Failed to send email" };
        }
    }

    // Update user activation code
    await userDB.updateOne({ email }, { activationCode: code.toString() });

    return { success: true };
}

export async function ValidateActivation({ email, code }: { email: string; code: string }) {
    RetryCleaner();

    const now = Date.now();

    // Check if user has reached max retries
    if (retries?.[email] && retries[email].count >= maxRetries) {
        retries[email].timestamp = now;
        return { error: "Max retries reached, please try again later" };
    }

    // Check if reset is delayed
    if (retries?.[email] && retries[email].timestamp + FIVE_MINUTES > now) {
        return { error: "Please wait 5 minutes before retrying" };
    }

    if (!retries[email]) retries[email] = { count: 0, timestamp: Date.now() };
    retries[email].count++;

    await MongoConnect();

    // Get user
    const user = await GetUserByEmail(email);
    if (!user) return { error: "User not found" };

    // Get activation code
    const activationCodeDoc = await userDB.findOne({ email: user.email }, { activationCode: 1 });
    const activationCode = activationCodeDoc?.activationCode;

    // Check if code is valid
    if (activationCode !== code) return { error: "Invalid code" };

    // Update user status
    await userDB.updateOne({ email }, { activated: true, activationCode: null });

    // Create new JWT token
    const token = Encryption.generateJwt({ id: user.id, activated: true });

    // Set user cookie
    cookies().set("access-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 90,
    });

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
        if (retries[email].timestamp + FIVE_MINUTES < Date.now()) {
            delete retries[email];
        }
    }
}
