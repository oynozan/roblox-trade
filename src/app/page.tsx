"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import Button from "@/components/Button";
import { Graph } from "@/data/dummy_Graph";

import "./home.scss";

export default function Home() {
    return (
        <div id="home">
            <div className="revenue">
                <div className="top">
                    <h2>Total revenue</h2>
                    <div className="timer">
                        <span>from</span>
                        <Button type="blank">
                            <span>August 2018</span>
                        </Button>
                        <span>to</span>
                        <Button type="blank">
                            <span>May 2019</span>
                        </Button>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={Graph} margin={{ bottom: 25, top: 25 }}>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="0"
                            strokeOpacity={0.2}
                            strokeWidth={0.5}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            padding={{ left: 60, right: 50 }}
                            dy={30}
                            stroke="#748AA1"
                            fontSize={16}
                        />
                        <Tooltip
                            cursor={false}
                            content={e => (
                                <CustomTooltip active={!!e.active} payload={e.payload} label={e.label} />
                            )}
                        />
                        <Line type="monotone" dataKey="price" stroke="#4963FA" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="bottom">
                <div className="accounts">
                    <h2>Listed Accounts</h2>

                    <div className="list">
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={280} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={370} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={460} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={280} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={370} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={460} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={280} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={370} />
                        <Account pfp="/dummy/avatar.png" username="Nickname" IP="192.168.2.23" robux={460} />
                    </div>

                    <div className="total">
                        <p>
                            Total Robux <span>{9000000} R$</span>
                        </p>
                    </div>
                </div>

                <div className="stocks">
                    <h2>Current Stock on Site</h2>

                    <div className="scale">
                        <p>0</p>
                        <p>1000</p>
                        <p>5000</p>
                        <p>10000</p>
                        <p>15000</p>
                    </div>

                    <div className="list">
                        <div className="axises">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <Stock amount={4.50} robux={4810} accounts={3} />
                        <Stock amount={12.50} robux={9810} accounts={3} />
                        <Stock amount={51.50} robux={12810} accounts={4} />
                        <Stock amount={4.50} robux={4810} accounts={3} />
                        <Stock amount={12.50} robux={9810} accounts={3} />
                        <Stock amount={51.50} robux={12810} accounts={4} />
                        <Stock amount={4.50} robux={4810} accounts={3} />
                    </div>

                    <div className="total">
                        <p>
                            Total Robux in queue <span>{9000000} R$</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Account({ pfp, username, IP, robux }: { pfp: string; username: string; IP: string; robux: number }) {
    return (
        <div className="account">
            <div className="info">
                <div className="profile">
                    <img src={pfp} alt="Profile Picture" />
                    <div>
                        <p>{username}</p>
                        <span>{IP}</span>
                    </div>
                </div>
                <div className="balance">{robux}/500 R$</div>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ width: ((robux / 500) * 100).toFixed(2) + "%" }}></div>
            </div>
        </div>
    );
}

function Stock({ amount, robux, accounts }: { amount: number; robux: number; accounts: number }) {
    return (
        <div className="stock">
            <p>$ {amount.toFixed(2)}</p>
            <div>
                <div className="progress-bar">
                    <div className="progress" style={{ width: ((robux / 15000) * 100).toFixed(2) + "%" }}></div>
                </div>
                <p>{robux} R$ ({accounts} accounts)</p>
            </div>
        </div>
    )
}

function CustomTooltip({ active, payload, label }: { active: boolean; payload: any; label: string }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <span className="value">{payload[0].value}</span>
            </div>
        );
    }

    return <></>;
}
