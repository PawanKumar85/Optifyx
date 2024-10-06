import Blog from "../model/blog.model.js";

// Get all blogs
export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).json({
      blogCount: blogs.length,
      success: true,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error getting all blogs",
    });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!(title && description && image)) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and image are required",
      });
    }

    const newBlog = new Blog({ title, description, image });
    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error creating blog",
    });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error updating blog",
    });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete({ _id: id });

    if (!blog) {
      return res.status(400).json({
        success: "false",
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      message: "Error deleting blog",
    });
  }
};

// Get single blog
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const findBlog = await Blog.findById({ _id: id });
    if (!findBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: "success",
      message: "Blog updated successfully",
      data: findBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error Getting blog",
    });
  }
};
