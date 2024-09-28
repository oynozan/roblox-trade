import toast from 'react-hot-toast';
import Alert from "./Alert";

const toast_options = {
    duration: 6000,
    style: {
        maxWidth: 550,
        padding: 0
    },
}

export default async function alertTrigger(type: string, options: any) {
    toast(t => (
        <Alert
            title = {options?.title}
            text = {options?.text}
            icon = {options?.icon ?? true}
            more = {options?.more}
            type = {type}
            t = {t}
        />
    ), { ...toast_options })
}