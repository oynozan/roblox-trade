"use client";

import Image from "next/image";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useRouter } from "next/navigation";

import {
    SendPasswordReset,
    ValidatePasswordReset,
    ValidatePasswordResetOTP,
} from "@/actions/auth/PasswordReset";
import Button from "@/components/Button";
import alertTrigger from "@/components/Alerts/alerts";

export default function ForgotPassword() {
    const router = useRouter();

    const [step, setStep] = useState(1);

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");

    async function sendOTP() {
        const response = await SendPasswordReset(email);

        if (response.error) {
            alertTrigger("error", {
                title: "Error",
                text: response.error,
            });

            return;
        }

        setStep(2);
    }

    async function handleOTP() {
        if (otp.length !== 6) return;

        const response = await ValidatePasswordResetOTP(email, otp);

        if (response.error) {
            alertTrigger("error", {
                title: "Error",
                text: response.error,
            });
            return;
        }

        setOtp("");
        setStep(3);
    }

    async function handleSubmit() {
        if (!newPassword || !newPasswordAgain) {
            alertTrigger("error", {
                title: "Error",
                text: "Please fill all fields",
            });
            return;
        }

        if (newPassword !== newPasswordAgain) {
            alertTrigger("error", {
                title: "Error",
                text: "Passwords do not match",
            });
            return;
        }

        const response = await ValidatePasswordReset({ email, newPassword });

        if (response.error) {
            alertTrigger("error", {
                title: "Error",
                text: response.error,
            });
            return;
        }

        alertTrigger("success", {
            title: "Success",
            text: "Password updated successfully",
        });

        router.push("/login");
    }

    if (step === 1) {
        return (
            <div id="login">
                <div className="form">
                    <h2>Password recovery</h2>
                    <div className="input-group">
                        <Image src={`/icons/gray-message.svg`} alt="Email" height={16} width={16} />
                        <input placeholder="Mail" type="email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <Button type="main" click={sendOTP} className="submit-btn">
                        Continue
                    </Button>
                </div>
                <div className="actions">
                    <Button type="main" href="/">
                        Log in
                    </Button>
                    <Button type="gray" href="/market">
                        To market
                    </Button>
                </div>
            </div>
        );
    } else if (step === 2) {
        return (
            <div id="login">
                <div className="form">
                    <h2>Password recovery</h2>
                    <p>
                        To the mail <span>{email}</span> a 6-digit password activation code has been sent.
                    </p>
                    <div className="otp-group">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<></>}
                            placeholder="xxxxxx"
                            renderInput={props => <input {...props} />}
                        />
                    </div>
                    <Button type="main" click={handleOTP} className="submit-btn">
                        Continue
                    </Button>
                </div>
            </div>
        );
    } else if (step === 3) {
        return (
            <div id="login">
                <div className="form">
                    <h2>Password recovery</h2>
                    <div className="input-group">
                        <Image src={`/icons/gray-lock.svg`} alt="New password" height={16} width={16} />
                        <input
                            placeholder="New password"
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <Image src={`/icons/gray-lock.svg`} alt="New password again" height={16} width={16} />
                        <input
                            placeholder="New password again"
                            type="password"
                            value={newPasswordAgain}
                            onChange={e => setNewPasswordAgain(e.target.value)}
                        />
                    </div>
                    <Button type="main" click={handleSubmit} className="submit-btn">
                        Continue
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}
