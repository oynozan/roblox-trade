import Image from 'next/image';
import Link from 'next/link';

import './deposit.scss';

export default function Deposit() {
    return (
        <div id="deposit" className="bg">
            <h1>Deposit</h1>

            <div className="methods">
                <Link href="/deposit/qiwi">
                    <Image
                        src="/logos/qiwi.svg"
                        alt="Qiwi"
                        height={60}
                        width={60}
                    />
                    <div className="name">
                        <h4>Qiwi</h4>
                        <p>Fee 5%</p>
                    </div>
                </Link>
                <Link href="/deposit/paypal">
                    <Image
                        src="/logos/paypal.svg"
                        alt="Paypal"
                        height={60}
                        width={51}
                    />
                    <div className="name">
                        <h4>PayPal</h4>
                        <p>Fee 2%</p>
                    </div>
                </Link>
                <Link href="/deposit/sberbank">
                    <Image
                        src="/logos/sberbank.svg"
                        alt="Sberbank"
                        height={60}
                        width={60}
                    />
                    <div className="name">
                        <h4>Sberbank</h4>
                        <p>Fee 3%</p>
                    </div>
                </Link>
                <Link href="/deposit/qiwi">
                    <Image
                        src="/logos/qiwi.svg"
                        alt="Qiwi"
                        height={60}
                        width={60}
                    />
                    <div className="name">
                        <h4>Qiwi</h4>
                        <p>Fee 5%</p>
                    </div>
                </Link>
                <Link href="/deposit/paypal">
                    <Image
                        src="/logos/paypal.svg"
                        alt="Paypal"
                        height={60}
                        width={51}
                    />
                    <div className="name">
                        <h4>PayPal</h4>
                        <p>Fee 2%</p>
                    </div>
                </Link>
                <Link href="/deposit/sberbank">
                    <Image
                        src="/logos/sberbank.svg"
                        alt="Sberbank"
                        height={60}
                        width={60}
                    />
                    <div className="name">
                        <h4>Sberbank</h4>
                        <p>Fee 3%</p>
                    </div>
                </Link>
                <Link href="/deposit/qiwi">
                    <Image
                        src="/logos/qiwi.svg"
                        alt="Qiwi"
                        height={60}
                        width={60}
                    />
                    <div className="name">
                        <h4>Qiwi</h4>
                        <p>Fee 5%</p>
                    </div>
                </Link>
                <Link href="/deposit/paypal">
                    <Image
                        src="/logos/paypal.svg"
                        alt="Paypal"
                        height={60}
                        width={51}
                    />
                    <div className="name">
                        <h4>PayPal</h4>
                        <p>Fee 2%</p>
                    </div>
                </Link>
                <Link href="/deposit/sberbank">
                    <Image
                        src="/logos/sberbank.svg"
                        alt="Sberbank"
                        height={60}
                        width={60}
                    />
                    <div className="name">
                        <h4>Sberbank</h4>
                        <p>Fee 3%</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}