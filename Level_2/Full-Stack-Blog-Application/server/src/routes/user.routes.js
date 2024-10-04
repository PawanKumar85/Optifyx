import express from "express";
import {
  registerUser,
  getAllUsers,
  login,
} from "../controller/user.controller.js";

const route = express.Router();

route
  .post("/register", registerUser)
  .get("/all-users", getAllUsers)
  .post("/login", login);

export default route;
