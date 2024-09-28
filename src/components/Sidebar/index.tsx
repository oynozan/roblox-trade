"use client"

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import './sidebar.scss';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div id="sidebar">
            <div className="navigation">
                <Link
                    href="/"
                    className={(pathname === "/") ? "active" : undefined}
                >
                    <div>
                        <Image
                            src={`/icons/${(pathname === "/") ? "white" : "gray"}-home.svg`}
                            alt="market"
                            height={20}
                            width={20}
                        />
                    </div>
                    <span>Home</span>
                </Link>
                <Link
                    href="/accounts"
                    className={pathname.startsWith("/accounts") ? "active" : undefined}
                >
                    <div>
                        <Image
                            src={`/icons/${pathname.startsWith("/accounts") ? "white" : "gray"}-inventory.svg`}
                            alt="account"
                            height={20}
                            width={20}
                        />
                    </div>
                    <span>Account</span>
                </Link>

                <Link
                    href="/proxy"
                    className={pathname.startsWith("/proxy") ? "active" : undefined}
                >
                    <div>
                        <Image
                            src={`/icons/${pathname.startsWith("/proxy") ? "white" : "gray"}-paper.svg`}
                            alt="proxy"
                            height={20}
                            width={20}
                        />
                    </div>
                    <span>Proxy</span>
                </Link>
            </div>

            <div className="social">
                <a href="https://discord.gg">
                    <Image
                        src={`/icons/gray-discord.svg`}
                        alt="Discord"
                        height={20}
                        width={20}
                    />
                </a>
            </div>
        </div>
    )
}