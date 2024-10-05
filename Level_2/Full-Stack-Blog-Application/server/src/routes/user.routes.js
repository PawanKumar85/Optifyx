import express from "express";
import {
  signUp,
  getAllUsers,
  login,
  logout,
} from "../controller/user.controller.js";
// import { verifyJWT } from "../middleware/user.auth.js";

const route = express.Router();

route
  .post("/sign-up", signUp)
  .get("/all-users", getAllUsers)
  .post("/login", login)
  .post("/logout", logout);

export default route;
