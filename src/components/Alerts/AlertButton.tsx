'use client'

import { type ReactNode } from 'react';

import Button from "../Button"
import alertTrigger from "./alerts";

interface IAlertButton {
    click: () => any;
    type?: string,
    custom?: any;
    options: any;
    children: ReactNode
}

export default function AlertButton({
    click = () => {},
    type = "blank",
    custom,
    options,
    children,
}: IAlertButton) {
    return (
        <Button
            type={type}
            click={() => {
                click();
                alertTrigger(options.type, options);
            }}
            custom={custom}
        >
            {children}
        </Button>
    )
}