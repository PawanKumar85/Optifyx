import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "my_jwt_secret_key";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!emailValidator.validate(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (password.length <= 7) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error registering user",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude the password field
    const count = users.length;

    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      total: count,
      success: true,
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error retrieving users",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    if ((!email && !userName) || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or email",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      tokenkey: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error logging in",
    });
  }
};
