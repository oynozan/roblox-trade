"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Cookie from "@/lib/cookie";
import Button from "@/components/Button";
import { useUserStore } from "@/lib/states";
import alertTrigger from "@/components/Alerts/alerts";
import { Login as LoginAction } from "@/actions/auth/Login";

export default function Login() {
    const router = useRouter();

    const setUser = useUserStore(s => s.setUser);

    const [hide, setHide] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        if (!email || !password) {
            alertTrigger("error", {
                title: "Error",
                text: "Please fill all fields",
            });
            return;
        }

        const response = await LoginAction(email, password);

        if (response.error) {
            alertTrigger("error", {
                title: "Error",
                text: response.error,
            });
            return;
        } else {
            setUser(response.user);
            Cookie.set("logged", "1", 90);
            router.push("/");
        }
    }

    return (
        <div id="login">
            <div className="form">
                <h2>Log in</h2>
                <div className="input-group">
                    <Image src={`/icons/gray-message.svg`} alt="Email" height={16} width={16} />
                    <input placeholder="Mail" type="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <Image src={`/icons/gray-lock.svg`} alt="Password" height={16} width={16} />
                    <input
                        placeholder="Password"
                        type={hide ? "password" : "text"}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Image
                        src={`/icons/${hide ? "gray" : "blue"}-hide.svg`}
                        className="clickable"
                        alt="Hide"
                        height={16}
                        width={17}
                        onClick={() => setHide(h => !h)}
                    />
                </div>
                <Button type="blank" href="/password-reset" className="inline-link">
                    Forgot password?
                </Button>
                <Button type="main" click={handleLogin} className="submit-btn">
                    Log in
                </Button>
            </div>
            <div className="actions">
                <Button type="main" href="/register">
                    Create an account
                </Button>
                <Button type="gray" href="/">
                    To market
                </Button>
            </div>
        </div>
    );
}
