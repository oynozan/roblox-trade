import Image from 'next/image';

import './auth.scss';

export default function Auth({ children }: { children: React.ReactNode }) {
    return (
        <div id="auth">
            <div className="brand">
                <Image src="/logo.svg" alt="Logo" height={150} width={150} />
            </div>
            <div className="content">
                <div className="logo">
                    <Image src="/logo.svg" alt="Logo" height={30} width={30} />
                </div>

                {children}
            </div>
        </div>
    );
}
