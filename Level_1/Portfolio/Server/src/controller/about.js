import About from "../model/about.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const POST_About = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate title and description
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Check for existing title
    const existingTitle = await About.findOne({ title });
    if (existingTitle) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }

    // Check if image is uploaded
    const imageFile = req.files?.image?.[0];
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image for the about section",
      });
    }

    // Upload image to Cloudinary
    const image = await uploadOnCloudinary(imageFile.path);
    if (!image) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    // Create new About document
    const newAbout = new About({
      title,
      description,
      imageSrc: image.secure_url,
    });

    // Save the new about section
    const savedAbout = await newAbout.save();
    if (!savedAbout) {
      return res.status(500).json({
        success: false,
        message: "Failed to save about section to the database",
      });
    }

    // Success response
    return res.status(201).json({
      success: true,
      message: "About section created successfully",
      about: savedAbout,
    });
  } catch (error) {
    // Handle server error
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
