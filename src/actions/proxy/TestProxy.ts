"use server";

import axios from "axios";

import MongoConnect from "@/lib/db";

export async function TestProxy(IP: string, Port: number, Username?: string, Password?: string) {
    try {
        await axios.get("https://httpbin.org/ip", {
            proxy: Username
                ? {
                      host: IP,
                      port: Port,
                  }
                : {
                      host: IP,
                      port: Port,
                      auth: {
                          username: Username!,
                          password: Password!,
                      },
                  },
        });

        return true;
    } catch (e) {
        return false;
    }
}
