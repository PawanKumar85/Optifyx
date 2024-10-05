import express from "express";
import {
  signUp,
  getAllUsers,
  login,
  logout,
  refreshAccessToken,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/user.auth.js";
// import { verifyJWT } from "../middleware/user.auth.js";

const route = express.Router();

route
  .post("/sign-up", signUp)
  .get("/all-users", getAllUsers)
  .post("/login", login)
  .post("/logout", verifyJWT, logout)
  .post("/refresh-token", refreshAccessToken)

export default route;
