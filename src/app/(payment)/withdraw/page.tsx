import Image from 'next/image';
import Link from 'next/link';

import './withdraw.scss';

export default function Withdraw() {
    return (
        <div id="withdraw" className="bg">
            <h1>Withdraw</h1>

            <div className="methods">
                <Link href="/withdraw/qiwi">
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
                <Link href="/withdraw/paypal">
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
                <Link href="/withdraw/sberbank">
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
                <Link href="/withdraw/qiwi">
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
                <Link href="/withdraw/paypal">
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
                <Link href="/withdraw/sberbank">
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
                <Link href="/withdraw/qiwi">
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
                <Link href="/withdraw/paypal">
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
                <Link href="/withdraw/sberbank">
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