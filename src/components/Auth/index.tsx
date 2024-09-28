"use client";

import { useEffect } from "react";

import Cookie from "@/lib/cookie";
import { useUserStore } from "@/lib/states";
import { GetUserByCookie } from "@/actions/auth/User";

export default function Auth() {
    const setUser = useUserStore(s => s.setUser);

    useEffect(() => {
        const isLogged = Cookie.get("logged");
        if (isLogged) {
            const getUser = async () => {
                try {
                    const user = await GetUserByCookie();
                    setUser(user);
                } catch (error) {
                    console.error(error);
                }
            };
            getUser();
        }
    }, []);

    return null;
}
