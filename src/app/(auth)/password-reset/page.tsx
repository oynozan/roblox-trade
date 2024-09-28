"use client";

import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/Button';

export default function ForgotPassword() {
    const [step, setStep] = useState(1)

    function sendOTP() {

    }

    function handleOTP() {

    }

    if (step === 1) {
        return (
            <div id="login">
                <div className="form">
                    <h2>Password recovery</h2>
                    <div className="input-group">
                        <Image src={`/icons/gray-message.svg`} alt="Email" height={16} width={16} />
                        <input placeholder="Mail" type="email" />
                    </div>
                    <Button type="main" click={() => {}} className="submit-btn">
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
    }

    else if (step === 2) {

    }

    return null;
}