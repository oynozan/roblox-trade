'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import './alerts.scss';

interface IAlert {
    title: string;
    text: string;
    icon: string;
    more: string;
    type: string;
    t: any;
}

export default function Alert({
    title,
    text,
    icon,
    more,
    type,
    t
}: IAlert) {

    const [iconState, setIcon] = useState({
        src: "/icons/green-check-square.svg",
        alt: "Check Icon"
    })

    useEffect(() => {
        switch (type) {
            case "success":
                setIcon({
                    src: "/icons/green-check-square.svg",
                    alt: "Check Icon"
                })
                break;

            case "error":
                setIcon({
                    src: "/icons/red-error-square.svg",
                    alt: "Error Icon"
                })
                break;

            default:
                setIcon({
                    src: "/icons/green-check-square.svg",
                    alt: "Check Icon"
                })
                break;
        }
    }, [type])

    return (
        <div className={"alert " + type} onClick={() => toast.dismiss(t.id)}>
            { icon && (
                <div className="icon-container">
                    <Image
                        src={iconState.src}
                        alt={iconState.alt}
                        height={28}
                        width={28}
                    />
                </div>
            )}

            <div className="text-container">
                { title && <h3>{title}</h3> }
                { text && <p>{text}</p> }
                { more && <Link href={more}>Learn More</Link> }
            </div>
        </div>
    );
}
