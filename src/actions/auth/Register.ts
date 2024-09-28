"use server";

import { cookies } from "next/headers";

import MongoConnect from "@/lib/db";
import { Encryption } from "@/lib/encryption";
import userDB, { IUser } from "@/models/User";

interface IRegister {
    username: string;
    email: string;
    password: string;
    affiliate: string;
}

export async function Register({ username, email, password, affiliate }: IRegister) {
    // Validate data
    if (!username || !email || !password) return { error: "Please fill in all fields" };
    if (password.length < 6) return { error: "Password must be at least 6 characters long" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Invalid email" };

    await MongoConnect();

    // Check if user exists
    const user: IUser | null = await userDB.findOne({ email });
    if (user) return { error: "User already exists" };

    // Check if username is taken
    const usernameExists: IUser | null = await userDB.findOne({ username });
    if (usernameExists) return { error: "Username already exists" };

    // Encrypt password
    const encryptedPassword = await Encryption.createPassword(password);

    // Create user
    const newUserObject: any = {
        username,
        email,
        password: encryptedPassword,
        registerDate: Date.now(),
    };

    if (affiliate) {
        // Check if affiliate exists
        const affiliateUser: IUser | null = await userDB.findOne({ affiliateCode: affiliate });
        if (!affiliateUser) return { error: "Invalid affiliate code" };

        newUserObject["referral"] = affiliate;
    }

    const newUser = new userDB(newUserObject);
    await newUser.save();

    const token = Encryption.generateJwt({ id: newUser._id?.toString(), activated: false });

    // Set user cookie
    cookies().set("access-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 90,
    });

    return { user: newUser };
}
