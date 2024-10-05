// emailSender.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sanitizeHtml from "sanitize-html";
import { getDeviceInfo } from "./device-info.js";
import { generateHtmlContent } from "./htmlContentGenerator.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Function to send email
export const sendMail = async (to, subject, from = "No Reply <noreply@example.com>") => {
  try {
    // Get device information
    const locationInfo = await getDeviceInfo();
    const { ipAddress, address, platform } = locationInfo;

    // Extract name and email from the 'from' field
    const [name, email] = from.match(/(.*)<(.*)>/)?.slice(1, 3) || [from, from];

    // Generate HTML content for the email
    const htmlContent = generateHtmlContent({
      deviceInfo: platform,
      ipAddress,
      localAddress: address,
    });

    // Sanitize the generated HTML content
    const safeMessage = sanitizeHtml(htmlContent, {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
      allowedAttributes: { a: ["href"] },
    });

    // Send the email
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
