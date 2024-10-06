import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      require: [true, "Title is required"],
    },
    description: {
      type: "string",
      require: [true, "Description is required"],
    },
    image: {
      type: "string",
      require: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
