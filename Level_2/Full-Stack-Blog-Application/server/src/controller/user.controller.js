import User from "../model/user.model.js";
import emailValidator from "email-validator";
import jwt from "jsonwebtoken";
import { sendMail } from "../helper/email.js";
import { getDeviceInfo } from "../helper/device-info.js";

// Generate access and refresh tokens
const generateAccessAndRefereshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Error generating tokens:", error.message);
    throw new Error("Token generation failed");
  }
};

// User signup
export const signUp = async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;
    if (!(userName && fullName && email && password)) {
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

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      userName: userName.toLowerCase(),
      fullName: fullName.toLowerCase(),
      email,
      password,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error registering user",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken"); // Exclude the password field
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

// User login
export const login = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if ((!email || !userName) && !password) {
      return res.status(400).json({
        success: false,
        message: "Email or username and password are required",
      });
    }

    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or username",
      });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const data = await getDeviceInfo();

    await sendMail(
      loggedInUser.email,
      "Security Alert",
      data.address,
      data.ipAddress,
      data.platform
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Logged in successfully",
        user: loggedInUser,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error logging in",
    });
  }
};

// User logout
export const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error logging out",
    });
  }
};

// Refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has expired or used",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        status: 200,
        success: true,
        message: "Access token refreshed successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error refreshing access token",
    });
  }
};
