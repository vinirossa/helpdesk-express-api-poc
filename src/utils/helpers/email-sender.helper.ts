/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import * as dotenv from "dotenv";
dotenv.config();

import nodemailer, { Transporter } from "nodemailer";
import Mail, { Attachment } from "nodemailer/lib/mailer";

export class EmailSenderHelper {
    private static sender: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        service: process.env.SMTP_SERVICE!,
        port: process.env.SMTP_PORT! as unknown as number,
        secure: true,
        auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PWD!,
        },
    });

    public static async sendAsync(to: string, subject: string, body: string, cc: string = ""): Promise<boolean> {
        const mailOptions: Mail.Options = {
            from: process.env.SMTP_USER!,
            to,
            cc,
            subject,
            html: body,
        };

        await EmailSenderHelper.sender.sendMail(mailOptions);

        return true;
    }

    public static async sendWithFilesAsync(
        to: string,
        subject: string,
        body: string,
        attachments: Attachment[],
        cc: string = "",
    ): Promise<boolean> {
        const mailOptions: Mail.Options = {
            from: process.env.SMTP_USER!,
            to,
            cc,
            subject,
            html: body,
            attachments,
        };

        await EmailSenderHelper.sender.sendMail(mailOptions);

        return true;
    }
}
