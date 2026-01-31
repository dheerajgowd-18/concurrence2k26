"use server";

import nodemailer from "nodemailer";
import { getActiveEmailAccounts } from "./supabase-actions";

export async function sendApprovalEmail(
    toEmail: string,
    name: string,
    whatsappLink?: string
) {
    const emailAccounts = await getActiveEmailAccounts();

    if (!emailAccounts || emailAccounts.length === 0) {
        throw new Error("No active email accounts found");
    }

    let sent = false;
    let errors = [];

    for (const account of emailAccounts) {
        try {
            console.log(`[EmailService] Attempting to send approval email via ${account.email_address}`);
            const transporter = nodemailer.createTransport({
                host: account.smtp_host,
                port: account.smtp_port,
                secure: account.smtp_port === 465, // true for 465, false for other ports
                auth: {
                    user: account.email_address,
                    pass: account.app_password,
                },
            });

            const info = await transporter.sendMail({
                from: `"TechSprint 2K26" <${account.email_address}>`,
                to: toEmail,
                subject: "Registration Approved - TechSprint 2K26",
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
            <p>Hello ${name},</p>
            <p>Your registration for TechSprint 2K26 has been <strong>approved</strong>.</p>
            ${whatsappLink ? `
            <p>You can now join the official WhatsApp group to stay updated:</p>
            <div style="margin: 30px 0;">
              <a href="${whatsappLink}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                JOIN WHATSAPP GROUP
              </a>
            </div>
            ` : `<p>Stay tuned for further updates regarding the event schedule and venue details.</p>`}
            <p>See you at the event!</p>
            <hr />
            <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply.</p>
          </div>
        `,
            });

            console.log(`[EmailService] Success! Message sent: ${info.messageId}`);
            sent = true;
            break;
        } catch (err) {
            console.error(`[EmailService Failure] ${account.email_address}:`, err);
            errors.push(err);
            continue;
        }
    }

    if (!sent) {
        throw new Error(`Failed to send email after trying all accounts: ${errors.join(", ")}`);
    }

    return true;
}

export async function sendRejectionEmail(toEmail: string, name: string) {
    const emailAccounts = await getActiveEmailAccounts();

    if (!emailAccounts || emailAccounts.length === 0) {
        throw new Error("No active email accounts found");
    }

    let sent = false;

    for (const account of emailAccounts) {
        try {
            console.log(`[EmailService] Attempting to send rejection email via ${account.email_address}`);
            const transporter = nodemailer.createTransport({
                host: account.smtp_host,
                port: account.smtp_port,
                secure: account.smtp_port === 465,
                auth: {
                    user: account.email_address,
                    pass: account.app_password,
                },
            });

            const info = await transporter.sendMail({
                from: `"TechSprint 2K26" <${account.email_address}>`,
                to: toEmail,
                subject: "Registration Status - TechSprint 2K26",
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
            <p>Hello ${name},</p>
            <p>Unfortunately, your payment verification for TechSprint 2K26 was <strong>unsuccessful</strong>.</p>
            <p>This could be due to an incorrect Transaction ID or Screenshot. Please try registering again with correct details.</p>
            <p>If you believe this is a mistake, contact the event coordinators.</p>
            <hr />
            <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply.</p>
          </div>
        `,
            });

            console.log(`[EmailService] Rejection Success! Message sent: ${info.messageId}`);
            sent = true;
            break;
        } catch (err) {
            console.error(`[EmailService Failure] ${account.email_address}:`, err);
            continue;
        }
    }

    if (!sent) {
        throw new Error("Failed to send rejection email after trying all accounts");
    }

    return true;
}
