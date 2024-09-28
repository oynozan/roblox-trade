"use server";

import { cookies } from "next/headers";

import MongoConnect from "@/lib/db";
import { Encryption } from "@/lib/encryption";
import userDB, { IUser } from "@/models/User";

export async function Login(email: string, password: string) {
    if (!email || !password) return { error: "Please fill in all fields" };
    if (password.length < 6) return { error: "User not found" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "User not found" };

    await MongoConnect();

    const user: IUser | null = await userDB.findOne({ email });
    if (!user) return { error: "User not found" };

    // Compare passwords using bcrypt
    const isValidPassword = await Encryption.comparePasswords(user.password, password);
    if (!isValidPassword) return { error: "Invalid password" };

    // Generate JWT token
    const token = Encryption.generateJwt({ id: user._id?.toString(), activated: user.activated });

    // Set user cookie
    cookies().set("access-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 90,
    });

    return { user };
}
