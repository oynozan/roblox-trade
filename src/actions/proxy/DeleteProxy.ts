"use server";

import MongoConnect from "@/lib/db";
import proxyDB from "@/models/Proxy";

export async function DeleteProxy(id: string) {
    await MongoConnect();
    await proxyDB.findByIdAndDelete(id);
    return { success: true };
}
