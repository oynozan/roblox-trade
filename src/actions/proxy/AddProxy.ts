"use server";

import MongoConnect from "@/lib/db";
import proxyDB from "@/models/Proxy";
import { TestProxy } from "./TestProxy";
import { GetUserByCookie } from "../auth/User";

export async function AddProxy(IP: string, Port: number, Username?: string, Password?: string) {
    const user = await GetUserByCookie();
    if (!user) return { error: "User not found" };

    await MongoConnect();

    if (!IP || !Port) return { error: "Missing required fields" };
    if (Username && !Password) return { error: "Missing password" };
    if (Password && !Username) return { error: "Missing username" };

    const test = await TestProxy(IP, Port, Username, Password);
    if (!test) return { error: "Proxy failed to connect" };

    const proxy = new proxyDB({
        userID: user.id,
        username: Username,
        password: Password,
        port: Port,
        IP,
        date: Date.now(),
    });
    await proxy.save();

    return { success: true };
}