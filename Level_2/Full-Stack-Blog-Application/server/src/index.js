import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v2", userRoute);

// testing routes
app.get("/", (req, res) => {
  const ip = getClientIp(req);

  res.json({
    success: true,
    message: `Hello, World! You are accessing this server from IP address ${ip}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
