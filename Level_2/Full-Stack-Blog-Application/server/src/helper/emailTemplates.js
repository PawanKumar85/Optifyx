export const welcomeEmailTemplate = (name, email) => `
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
          <h2 class="text-xl font-bold">Welcome to Our Blog!</h2>
        </div>
        <div class="p-5">
          <p class="text-lg font-bold mb-3">Hello ${name}!</p>
          <p class="mb-2 text-lg">You have successfully created your account on our Blog Application.</p>
          <p class="mt-2"><strong>Email:</strong> ${email}</p>
          <p class="mt-3">We are excited to have you in our community! Explore, share, and engage with our content.</p>
          <p class="mt-4">
            <strong><a href="https://yourblog.com" class="text-blue-600 font-bold hover:underline">Visit Our Blog</a></strong>
          </p>
        </div>
        <div class="p-5 text-center text-gray-600 text-sm">
          <p>© 2024 Your Blog Application. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export const adminNotificationTemplate = (newUser) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    </head>
    <body class="bg-gray-100">
      <div class="max-w-md mx-auto mt-20 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <div class="bg-blue-600 text-white p-5 text-center">
          <h2 class="text-xl font-bold">🎉 New User Registration Alert!</h2>
        </div>
        <div class="p-5">
          <p class="text-lg font-bold mb-3">Hello Admin!</p>
          <p class="mb-2 text-lg">We are excited to inform you that a new user has registered on the Blog Application:</p>
          <p class="mt-2"><strong>Name:</strong> ${newUser.fullName}</p>
          <p class="mt-1"><strong>Email:</strong> ${newUser.email}</p>
          <p class="mt-3">Thank you for managing the community!</p>
          <p class="mt-3">Feel free to log in and check the new user's profile.</p>
          <p class="mt-4">
            <strong><a href="https://yourblog.com/admin" class="text-blue-600 font-bold hover:underline">Go to Admin Dashboard</a></strong>
          </p>
        </div>
        <div class="p-5 text-center text-gray-600 text-sm">
          <p>© 2024 Your Blog Application. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export const sendLoginAlertTemplate = ({
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
