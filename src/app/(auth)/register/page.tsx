"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Cookie from "@/lib/cookie";
import Button from "@/components/Button";
import { useUserStore } from "@/lib/states";
import Checkbox from "@/components/Checkbox";
import alertTrigger from "@/components/Alerts/alerts";
import { Register as RegisterAction } from "@/actions/auth/Register";

export default function Register() {
    const router = useRouter();

    const setUser = useUserStore(s => s.setUser);

    const [hide, setHide] = useState(true);
    const [repeatHide, setRepeatHide] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [policyAccepted, setPolicyAccepted] = useState(false);

    async function handleRegister() {
        if (!policyAccepted) {
            alertTrigger("error", {
                title: "Error",
                text: "You must accept the privacy policy",
            });
            return;
        }

        if (!username || !email || !password || !repeatPassword) {
            alertTrigger("error", {
                title: "Error",
                text: "Please fill all fields",
            });
            return;
        }

        if (password !== repeatPassword) {
            alertTrigger("error", {
                title: "Error",
                text: "Passwords do not match",
            });
            return;
        }

        if (password.length < 6) {
            alertTrigger("error", {
                title: "Error",
                text: "Password must be at least 6 characters",
            });
            return;
        }

        const response = await RegisterAction({
            username,
            email,
            password,
            affiliate: referralCode,
        });

        if (response.error) {
            alertTrigger("error", response.error);
            return;
        } else {
            setUser(response.user);
            Cookie.set("logged", "1", 90);
            router.push("/activate");
        }
    }

    return (
        <div id="register">
            <div className="form">
                <h2>Create an account</h2>
                <div className="input-group">
                    <Image src={`/icons/gray-message.svg`} alt="Email" height={16} width={16} />
                    <input placeholder="Mail" type="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <Image src={`/icons/gray-profile.svg`} alt="Username" height={16} width={16} />
                    <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
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
                <div className="input-group">
                    <Image src={`/icons/gray-lock.svg`} alt="Password" height={16} width={16} />
                    <input
                        placeholder="Repeat Password"
                        type={repeatHide ? "password" : "text"}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                    <Image
                        src={`/icons/${repeatHide ? "gray" : "blue"}-hide.svg`}
                        className="clickable"
                        alt="Hide"
                        height={16}
                        width={17}
                        onClick={() => setRepeatHide(h => !h)}
                    />
                </div>
                <div className="input-group">
                    <Image src={`/icons/gray-ticket.svg`} alt="Referral" height={16} width={16} />
                    <input placeholder="Referral Code" onChange={e => setReferralCode(e.target.value)} />
                </div>
                <div className="checkbox-group">
                    <Checkbox set={() => setPolicyAccepted(!policyAccepted)} state={policyAccepted} />
                    <p>
                        I agree with the <Link href="/info/privacy-policy">privacy policy</Link>
                    </p>
                </div>
                <Button type="main" click={handleRegister} className="submit-btn">
                    Create account
                </Button>
            </div>
            <div className="actions">
                <Button type="main" href="/login">
                    Log in
                </Button>
                <Button type="gray" href="/">
                    To market
                </Button>
            </div>
        </div>
    );
}
