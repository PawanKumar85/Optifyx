import express from "express";
import { DELETE, GET, GETSingle, POST } from "../controller/contact.js";
const router = express.Router();

// router.get("/contacts", GET);

router.post("/contacts", POST);
router.get("/contacts", GET);
router.delete("/:id", DELETE);
router.get("/:id", GETSingle);
export default router;
