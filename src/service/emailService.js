import dotenv from "dotenv";
import { Resend } from "resend";
import nodemailer from "nodemailer";

dotenv.config();

/**
 * Email Service Provider Enum
 */
const PROVIDERS = {
    RESEND: "resend",
    SMTP: "smtp",
    AWS_SES: "aws_ses" // Future AWS SES Integration
};

/**
 * EmailService Class - Handles email sending using different providers
 */
class EmailService {
    constructor() {
        this.provider = process.env.EMAIL_PROVIDER || PROVIDERS.RESEND;
        if (this.provider === PROVIDERS.RESEND) {
            this.resend = new Resend(process.env.RESEND_API_KEY);
        } else if (this.provider === PROVIDERS.SMTP) {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
                service: process.env.SMTP_SERVICE || "gmail"
            });
        }
    }

    /**
     * Send an email based on the current provider
     * @param {string} to - Recipient email
     * @param {string} subject - Email subject
     * @param {string} html - HTML email content
     */
    async sendEmail(to, subject, html) {
        if (this.provider === PROVIDERS.RESEND) {
            return this.sendWithResend(to, subject, html);
        } else if (this.provider === PROVIDERS.SMTP) {
            return this.sendWithSMTP(to, subject, html);
        } else {
            throw new Error("Unsupported email provider");
        }
    }

    /**
     * Send email using Resend
     */
    async sendWithResend(to, subject, html) {
        return this.resend.emails.send({
            from: process.env.SMTP_FROM, // Resend sender email
            to,
            subject,
            html
        });
    }

    /**
     * Send email using SMTP
     */
    async sendWithSMTP(to, subject, html) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to,
            subject,
            html
        };
        return this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();
