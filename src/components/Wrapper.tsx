import { Toaster } from "react-hot-toast";

import Auth from './Auth';
import Modals from "@/components/Modal/Modals";

export default function Wrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toaster position="bottom-right" containerClassName="toast-container" />
            <Modals />
            <Auth />
            {children}
        </>
    );
}
