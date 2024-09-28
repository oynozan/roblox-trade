'use client'

import { type ReactElement, useState } from "react";
import Button from "../Button"
import Dropdown from "./index";

import './dropdown.scss';

export default function DropdownButton({
    click = () => {},
    type = "blank",
    custom,
    customClass,
    items,
    children,
} : {
    click?: () => void,
    type?: string,
    custom?: object,
    customClass?: string,
    items: Array<ReactElement>,
    children: React.ReactNode
}) {

    const [state, setState] = useState<Boolean>(false);

    return (
        <div className={"dropdown-wrapper " + (customClass ?? "")}>
            <Button
                type={type}
                custom={custom}
                click={() => {
                    click();
                    setState(!state);
                }}
                className={state ? "active" : undefined}
            >
                {children}
            </Button>

            { state && <Dropdown items={items} set={setState} />}
        </div>
    )
}