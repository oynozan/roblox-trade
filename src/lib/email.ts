import { createTransport } from "nodemailer";

export async function sendMail(subject: string, to: string, text: string) {
    const transporter = createTransport({
        service: process.env.NODEMAILER_SERVICE,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, function (error: any) {
        if (error) {
            throw new Error(error);
        } else {
            console.log("Email Sent");
            return true;
        }
    });
}
