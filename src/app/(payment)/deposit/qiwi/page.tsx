"use client";

import Image from "next/image";
import { useState } from "react";

import Button from "@/components/Button";
import { separateBalance } from "@/lib/balance";

import "../deposit.scss";

export default function QiwiDeposit() {
    const [amount, setAmount] = useState(250);

    return (
        <div className="deposit-content bg">
            <Image src="/logos/qiwi.svg" alt="Qiwi" height={250} width={250} />

            <div className="amount-container">
                <div className="input-group">
                    <span>Amount:</span>
                    <div className="amount">
                        <input
                            value={amount}
                            onChange={e => setAmount(parseFloat(e.target.value))}
                            type="number"
                        />
                        <div className="dollar">
                            <Image src="/icons/white-dollar.svg" alt="Dollar" height={20} width={10} />
                        </div>
                    </div>
                </div>

                <span>Fee 5%</span>

                <div className="input-group">
                    <span>You will earn:</span>
                    <div className="amount">
                        <p className="val">{separateBalance(amount - amount / 20)}</p>
                        <div className="dollar">
                            <Image src="/icons/white-dollar.svg" alt="Dollar" height={20} width={10} />
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <Button type="main" click={() => {}}>
                        Next
                    </Button>
                    <Button type="gray" href="/deposit">
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
