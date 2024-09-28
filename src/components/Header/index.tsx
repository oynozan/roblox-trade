"use client";

import Link from "next/link";
import Image from "next/image";

import { IoMenu } from "react-icons/io5";

import Cookie from "@/lib/cookie";
import { useUserStore } from "@/lib/states";
import { Logout } from "@/actions/auth/Logout";
import { separateBalance } from "@/lib/balance";
import AlertButton from "../Alerts/AlertButton";
import DropdownButton from "../Dropdown/DropdownButton";

import "./header.scss";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const user = useUserStore(s => s.user);

    async function logout() {
        await Logout();
        Cookie.erase("logged");
        router.push("/login");
    }

    if (!user) return null;

    return (
        <header>
            <Link href="/" className="logo">
                <Image src="/logo.svg" alt="Logo" height={30} width={30} />
            </Link>

            <div className="middle">
                <div className="info">
                    <div className="balance">
                        <DropdownButton
                            items={[
                                <Link key={1} href="/deposit">
                                    Deposit
                                </Link>,
                                <Link key={2} href="/withdraw">
                                    Withdraw
                                </Link>,
                            ]}
                            customClass={"w-150"}
                        >
                            <div className="amount">
                                <div className="dollar">
                                    <Image
                                        src="/icons/white-dollar.svg"
                                        alt="Dollar"
                                        height={20}
                                        width={10}
                                    />
                                </div>
                                {separateBalance(user.balance)}
                            </div>
                        </DropdownButton>
                        <Link href="/deposit">
                            <Image src="/icons/white-plus.svg" alt="Deposit" height={12} width={12} />
                        </Link>
                    </div>

                    <div className="profile">
                        <DropdownButton
                            items={[
                                <AlertButton
                                    key={2}
                                    click={logout}
                                    options={{
                                        type: "success",
                                        title: "Logged out!",
                                        text: "You've successfuly logged out",
                                        icon: true,
                                    }}
                                >
                                    Logout
                                </AlertButton>,
                            ]}
                            customClass={"w-150"}
                        >
                            <Image src={user.avatar} alt="Profile" height={40} width={40} />
                            <Image
                                src="/icons/gray-down.svg"
                                alt="Down"
                                height={10}
                                width={16}
                                className="arrow"
                            />
                        </DropdownButton>
                    </div>
                </div>

                <div className="mobile">
                    <IoMenu color="#ffffff" size={30} />
                </div>
            </div>

            <div className="status">
                <div className="flick-effect">
                    {/* Empty divs for animating flick effect in CSS */}
                    <div></div>
                    <div></div>
                </div>
                Live
            </div>
        </header>
    );
}
