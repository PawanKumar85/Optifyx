import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sanitizeHtml from "sanitize-html";

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

// Function to send a welcome email
export const sendWelcomeEmail = async (to, name, email) => {
  const subject = "🎉 Welcome to Our Blog Application!";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-100">
        <div class="max-w-md mx-auto mt-20 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div class="bg-green-600 text-white p-5 text-center">
            <h2 class="text-xl font-bold">Welcome to the Blog Application!</h2>
          </div>
          <div class="p-5">
            <p class="text-lg font-bold mb-3">Hello <strong>${name}</strong>!</p>
            <p class="mb-2 text-lg">You have successfully created your account!</p>
            <p class="text-gray-600 mb-4">Your email address: <strong>${email}</strong></p>
            <p class="mt-3">We’re thrilled to have you here! 🎉</p>
            <p class="mt-2">Explore our latest blog posts, connect with fellow readers, and share your thoughts with the community!</p>
            <p class="mt-3">As a special welcome, here’s a fun fact: Did you know that blogging has been around since the late 1990s? It started as a way for people to express themselves online, and now it's a thriving platform for sharing knowledge, experiences, and ideas!</p>
            <p class="mt-4">Happy blogging! 🚀</p>
          </div>
          <div class="p-5 text-center text-gray-600 text-sm">
            <p>© 2024 Your Blog Application. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

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
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};
