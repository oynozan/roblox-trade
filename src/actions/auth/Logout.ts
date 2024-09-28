"use server"

import { cookies } from 'next/headers';

export async function Logout() {
    // Remove user cookie
    cookies().set("access-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
    });

    return { success: true };
}