import express from "express";
import { signUp, getAllUsers } from "../controller/user.controller.js";

const route = express.Router();

route
  .post("/sign-up", signUp)
  .get("/all-users", getAllUsers);

export default route;
