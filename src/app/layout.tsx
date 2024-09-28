import type { Metadata } from "next";
import { Roboto, Rubik } from "next/font/google";

// Components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper";

import "../styles/main.scss";

// Fonts
const rubik = Rubik({ subsets: ["latin"], variable: "--rubik" });
const roboto = Roboto({ subsets: ["latin"], variable: "--roboto", weight: ["400", "500", "700"] });

// Metadata
export const metadata: Metadata = {
    title: "Roblox Trade",
    description: "Roblox Trade",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${rubik.variable} ${roboto.variable}`}>
                <Wrapper>
                    <Header />
                    <div id="main-container">
                        <Sidebar />
                        <main>{children}</main>
                    </div>
                </Wrapper>
            </body>
        </html>
    );
}
