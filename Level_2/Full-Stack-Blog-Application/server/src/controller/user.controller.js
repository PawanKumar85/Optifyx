import User from "../model/user.model.js";
import emailValidator from "email-validator";

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
      message: "User registered successfully"
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
