"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import Button from "@/components/Button";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";
import { DummyAccounts } from "@/data/dummy_Accounts";
import { GetProxies } from "@/actions/proxy/GetProxies";

import "./proxy.scss";

export default function Accounts() {
    const [proxies, setProxies] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [addProxyModal, setAddProxyModal] = useState(false);

    useEffect(() => {
        (async () => {
            const proxiesRaw = await GetProxies();
            setProxies(proxiesRaw);
        })();
    }, []);

    function deleteProxy() {}

    return (
        <>
            <div id="proxy">
                <h1>Proxies</h1>
                <div className="actions">
                    <Button type="main" click={() => setAddProxyModal(true)}>
                        <Image src="/icons/white-plus.svg" alt="Add" height={18} width={18} />
                        ADD NEW PROXY
                    </Button>
                </div>

                <div className="table-container">
                    <div className="top">
                        <p>Total Proxies: {proxies.length}</p>
                        <p className="selected">Selected Items: 0</p>
                    </div>

                    <DataTable
                        className="list-table"
                        data={proxies}
                        columns={[
                            {
                                name: "IP",
                                selector: r => r.IP,
                            },
                            {
                                name: "Port",
                                selector: r => r.port,
                            },
                            {
                                name: "Username",
                                selector: r => r.username || "-",
                            },
                            {
                                name: "Password",
                                selector: r => r.password || "-",
                            },
                            {
                                name: (
                                    <button className="delete-btn" onClick={deleteProxy}>
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
                                    <Checkbox
                                        state={selected.includes(id)}
                                        set={s => {
                                            if (s) {
                                                setSelected([...selected, id]);
                                            } else {
                                                setSelected(selected.filter(i => i !== id));
                                            }
                                        }}
                                        square
                                        blue
                                    />
                                ),
                            },
                        ]}
                    />

                    <div className="bottom">
                        <Checkbox
                            state={selected.length === proxies.length}
                            set={s => {
                                if (s) {
                                    setSelected(proxies.map(p => p.id));
                                } else {
                                    setSelected([]);
                                }
                            }}
                            square
                        />
                        Select All
                    </div>
                </div>
            </div>
            {addProxyModal && <AddProxyModal close={() => setAddProxyModal(false)} />}
        </>
    );
}

function AddProxyModal({ close }: { close: () => any }) {
    return (
        <div className="inline-modal add-proxy-modal">
            <textarea>Enter text here</textarea>

            <div className="actions">
                <Button type="lgray" click={close}>
                    Back
                </Button>
                <Button type="main">Confirm</Button>
            </div>
        </div>
    );
}
