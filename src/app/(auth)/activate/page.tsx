"use client";

import OTPInput from "react-otp-input";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { useUserStore } from "@/lib/states";
import alertTrigger from '@/components/Alerts/alerts';
import { SendActivation, ValidateActivation } from "@/actions/auth/Activation";

export default function Activate() {
    const user = useUserStore(s => s.user);

    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (user) {
            sendOTP();
        }
    }, [user]);

    useEffect(() => {
        if (otp.length === 6 && user) {
            handleOTP();
        }
    }, [user, otp]);

    async function sendOTP() {
        if (!user) return;

        const response = await SendActivation(user.email);
        if (response.error) {
            console.error(response.error);
            return;
        }
    }

    async function handleOTP() {
        if (!user) return;
        if (otp.length !== 6) return;

        const response = await ValidateActivation({ email: user.email, code: otp });

        if (response.error) {
            alertTrigger('error', {
                title: 'Error',
                text: response.error
            });
            return;
        }

        setOtp("");

        // Redirect to the next page
        window.location.href = "/";
    }

    if (!user) return null;

    return (
        <div id="login">
            <div className="form">
                <h2>Activate your account</h2>
                <p>
                    To the mail <span>{user.email}</span> a 6-digit password activation code has been sent.
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
                <Button type="main" click={() => {}} className="submit-btn">
                    Continue
                </Button>
            </div>
        </div>
    );
}
