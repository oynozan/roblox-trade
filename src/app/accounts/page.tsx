"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import Button from "@/components/Button";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";
import { DummyAccounts } from "@/data/dummy_Accounts";

import "./accounts.scss";

export default function Accounts() {
    const [selected, setSelected] = useState(false);
    const [newAccountModal, setNewAccountModal] = useState(false);

    return (
        <>
            <div id="accounts">
                <h1>Accounts</h1>
                <div className="actions">
                    <Button type="main" click={() => setNewAccountModal(true)}>
                        <Image src="/icons/white-plus.svg" alt="Add" height={18} width={18} />
                        ADD NEW ACCOUNTS
                    </Button>

                    <div className="white-container">
                        <div className="labels">
                            <p>Current Robux Rate Per Thousand:</p>
                            <p>$3.50</p>
                        </div>
                        <div className="rate">
                            <p>$3.50</p>
                            <Image src="/icons/gray-question.svg" alt="Question" height={24} width={24} />
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    <div className="top">
                        <p>Total Accounts: 5053</p>
                        <p className="selected">Selected Items: 0</p>
                    </div>

                    <DataTable
                        className="list-table"
                        data={DummyAccounts}
                        columns={[
                            {
                                name: "Username",
                                selector: r => r.username,
                            },
                            {
                                name: "Robux",
                                selector: r => r.robux,
                                sortable: true,
                            },
                            {
                                name: "Spent",
                                selector: r => r.spent,
                                sortable: true,
                            },
                            {
                                name: "Date",
                                selector: r => r.date,
                            },
                            {
                                name: "Activity",
                                cell: (row, index, column, id) => (
                                    <Switch status={selected} set={setSelected} />
                                ),
                            },
                            {
                                name: "Proxy",
                                cell: (row, index, column, id) => <p className="proxy">Proxy</p>,
                            },
                            {
                                name: (
                                    <button className="delete-btn" onClick={() => setSelected(false)}>
                                        <Image
                                            src="/icons/white-delete.svg"
                                            alt="Delete"
                                            height={17}
                                            width={14}
                                        />
                                        Delete
                                    </button>
                                ),
                                cell: (row, index, column, id) => (
                                    <Checkbox state={selected} set={setSelected} square blue />
                                ),
                            },
                        ]}
                    />

                    <div className="bottom">
                        <Checkbox state={selected} set={setSelected} square />
                        Select All
                    </div>
                </div>
            </div>
            {newAccountModal && <NewAccountModal close={() => setNewAccountModal(false)} />}
        </>
    );
}

function NewAccountModal({ close }: { close: () => any }) {
    return (
        <div className="inline-modal new-account-modal">
            <textarea>Enter text here</textarea>

            <div className="selection">
                <div className="white-container">
                    <div className="labels">
                        <p>Proxy Selection</p>
                    </div>
                    <div className="rate">
                        <p>221.156.248.197</p>
                        <p>LAST PINGED 5 MINS AGO</p>
                    </div>
                </div>
                <div className="white-container">
                    <div className="labels">
                        <p>Current Robux Rate Per Thousand:</p>
                        <p>$3.50</p>
                    </div>
                    <div className="rate">
                        <p>$3.50</p>
                        <Image src="/icons/gray-question.svg" alt="Question" height={24} width={24} />
                    </div>
                </div>
            </div>

            <div className="actions">
                <Button type="lgray" click={close}>
                    Back
                </Button>
                <Button type="main">Confirm</Button>
            </div>
        </div>
    );
}
