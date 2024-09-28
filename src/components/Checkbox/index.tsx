"use client";

import Image from "next/image";
import "./checkbox.scss";

export default function Checkbox({
    state,
    set,
    square = false,
    blue = false,
}: {
    state: boolean;
    set: (state: boolean) => any;
    square?: boolean;
    blue?: boolean;
}) {
    return (
        <div
            className={`custom-checkbox ${state ? "checked " : " "} ${square ? "square " : " "} ${
                blue ? "blue " : " "
            }`}
            onClick={() => set(!state)}
        >
            {state && <Image src="/icons/white-check.svg" alt="Check Icon" height={12} width={12} />}
        </div>
    );
}
