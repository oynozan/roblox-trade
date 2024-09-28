"use client";

import { useState } from 'react';

import Button from '@/components/Button';

import './trade.scss';

export default function Test() {
    const [step, setStep] = useState(1);

    return (
        <div id="trade">
            <div className="progress">
                <div className="circle active">1</div>
                <div className="line active"></div>
                <div className="circle">2</div>
                <div className="line"></div>
                <div className="circle">2</div>
            </div>

            <div className="container">
                <h1>Main Text</h1>
                <h2>Subtitle Here</h2>

                <div className="available">
                    <p>AVAILABLE: <span>9125 R$</span></p>
                </div>

                <div className="quick-selection">
                    <Button type="blank">100 R$</Button>
                    <Button type="blank">250 R$</Button>
                    <Button type="blank">500 R$</Button>
                    <Button type="blank">1000 R$</Button>
                </div>

                <div className="input-group">
                    <div className="icon">R$</div>
                    <input defaultValue={600} type="number" />
                </div>

                <p className="warning">MINIMUM FROM 100 R$</p>

                <Button type="main" className="next">Continue</Button>

                <div className="bottom">
                    <p>TOTAL: <span>600.00 R$</span></p>
                    <p>TO BE PAID: <span>$6.04</span></p>
                </div>
            </div>
        </div>
    )
}