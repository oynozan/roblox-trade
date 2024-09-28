import Image from "next/image";

import Button from '@/components/Button';

import './merge-modal.scss';

export default function MergeModal() {
    return (
        <div id="merge-modal">
            <div className="logos">
                <Image src="/dummy/swapstation.png" alt="Old logo" height={140} width={140} />
                <span>x</span>
                <Image src="/dummy/swapstation.png" alt="Old logo" height={140} width={140} />
            </div>

            <div className="texts">
                <h1><span>ROBUXSHIP.COM</span> has been<br/>merged with <span>BLOXY.GG</span></h1>
                <p>Subtitle text goes here, robuxship has been merged with bloxy.gg Placeholder here again Subtitle text goes here , robuxship has been merged with bloxy.gg Placeholder here again</p>
                <Button href="/">Visit here</Button>
            </div>

            <div className="bottom">
                Redirecting in 10 seconds...
            </div>
        </div>
    );
}
