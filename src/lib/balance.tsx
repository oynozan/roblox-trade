export function separateBalance(bal: number | string) {
    if (!bal) bal = 0;
    if (typeof bal !== "number") bal = parseFloat(bal);

    let arr = bal.toFixed(2).toString().split(".");
    let integerPart = "";

    for (let i = arr[0].length - 1; i >= 0; i--) {
        if ((arr[0].length - i - 1) % 3 === 0 && i != arr[0].length - 1) integerPart = " " + integerPart;
        integerPart = arr[0][i] + integerPart;
    }

    return (
        <span className="s-integer">
            {integerPart}
            <span className="s-float">.{arr[1]}</span>
        </span>
    );
}
