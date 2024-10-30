"use server";

import MongoConnect from "@/lib/db";
import proxyDB from "@/models/Proxy";

export async function GetProxies() {
    await MongoConnect();
    const proxies = await proxyDB.find();

    return proxies.map(proxy => {
        return {
            id: proxy._id,
            IP: proxy.IP,
            port: proxy.port,
            username: proxy.username,
            password: proxy.password,
        };
    });
}
