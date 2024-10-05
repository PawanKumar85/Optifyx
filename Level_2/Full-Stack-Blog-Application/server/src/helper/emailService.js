// email/emailService.js
import transporter from "./emailTransporter.js";
import { getDeviceInfo } from "./device-info.js";
import dotenv from "dotenv";

import {
  welcomeEmailTemplate,
  adminNotificationTemplate,
  sendLoginAlertTemplate,
} from "./emailTemplates.js";
import sanitizeHtml from "sanitize-html";

dotenv.config();

export const sendWelcomeEmail = async (to, name, email) => {
  const subject = "Welcome to Our Blog Application!";
  const htmlContent = welcomeEmailTemplate(name, email);
  const safeMessage = sanitizeHtml(htmlContent, {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
    allowedAttributes: { a: ["href"] },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.USER,
      to,
      subject,
      html: safeMessage,
    });
    console.log("Welcome email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};

export const sendAdminNotification = async (newUser) => {
  const adminEmail = process.env.USER;
  const subject = "🎉 New User Registration Alert!";
  const htmlContent = adminNotificationTemplate(newUser);
  const safeMessage = sanitizeHtml(htmlContent, {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
    allowedAttributes: { a: ["href"] },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: adminEmail,
      subject,
      html: safeMessage,
    });
    console.log("Admin notification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending admin notification email:", error);
    return { success: false, error: error.message };
  }
};

export const sendLoginAlert = async (
  to,
  subject,
  from = "No Reply <noreply@example.com>"
) => {
  try {
    const locationInfo = await getDeviceInfo();
    const { ipAddress, address, platform } = locationInfo;
    const [name, email] = from.match(/(.*)<(.*)>/)?.slice(1, 3) || [from, from];

    const htmlContent = sendLoginAlertTemplate({
      deviceInfo: platform,
      ipAddress,
      localAddress: address,
    });

    const safeMessage = sanitizeHtml(htmlContent, {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
      allowedAttributes: { a: ["href"] },
    });

    const info = await transporter.sendMail({
      from: process.env.USER,
      to,
      subject,
      html: safeMessage,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
