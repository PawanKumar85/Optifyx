// htmlContentGenerator.js
export const generateHtmlContent = ({
  deviceInfo,
  ipAddress,
  localAddress,
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Tailwind CSS CDN -->
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-100">
        <div class="max-w-md mx-auto mt-20 bg-red-50 border border-red-400 rounded-lg shadow-lg overflow-hidden">
          <div class="bg-red-600 text-white p-5 text-center">
            <h2 class="text-xl font-bold">Security Alert</h2>
          </div>
          <div class="p-5">
            <p class="text-red-700 font-bold mb-3">⚠️ Important: Unusual Login Attempt Detected</p>
            <p class="mb-2 text-lg">We noticed a login attempt to your account from a new device:</p>
            <p><strong>Device:</strong> ${deviceInfo}</p>
            <p><strong>IP Address:</strong> ${ipAddress}</p>
            <p><strong>Local Address:</strong> ${
              localAddress || "Not available"
            }</p>
            <p class="mt-3">If this wasn't you, we recommend resetting your password to secure your account.</p>
            <p class="mt-2">
              <strong><a href="https://yourapp.com/reset-password" class="text-blue-600 font-bold hover:underline">Reset Password</a></strong>
            </p>
            <p class="mt-3">You received this message to let you know about important changes to your account.</p>
          </div>
          <div class="p-5 text-center">
            <p>If you believe this is a mistake, you can ignore this message. If you have questions, contact our support.</p>
          </div>
          <div class="p-5 text-center text-gray-600 text-sm">
            <p>© 2024 Pawan LLC, Kanpur Mandhana, India</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
