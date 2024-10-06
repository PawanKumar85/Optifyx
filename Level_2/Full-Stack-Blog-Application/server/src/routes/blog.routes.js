import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
} from "../controller/blog.controller.js";
const routes = express.Router();

// get all blogs
routes
  .get("/blog", getAllBlog)
  .post("/blog", createBlog)
  .put("/blog/:id", updateBlog)
  .get("/blog/:id", getSingleBlog)
  .delete("/blog/:id", deleteBlog);
export default routes;
