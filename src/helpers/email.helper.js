import verificationEmailTemplate from "../templete/verification-email.js";
import passwordResetTemplate from "../templete/password-reset-email.js";
import passwordChangedTemplate from "../templete/password-change-email.js";
import emailService from "../service/emailService.js";

import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/api/auth/verify-email/${token}`;
    console.log("verificationUrl", verificationUrl)
    const subject = "Verify Your Email - Supawase";
    const html = verificationEmailTemplate({ verificationUrl });

    return emailService.sendEmail(email, subject, html);
};

/**
 * Send Password Reset Email
 */
export const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const subject = "Reset Your Password - MentorPaw";
    const html = passwordResetTemplate({ resetUrl });

    return emailService.sendEmail(email, subject, html);
};

/**
 * Send Password Changed Email
 */
export const sendPasswordChangedEmail = async (email) => {
    const subject = "Password Changed Successfully - MentorPaw";
    const html = passwordChangedTemplate();

    return emailService.sendEmail(email, subject, html);
};