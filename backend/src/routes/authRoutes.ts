import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);
router.post("/login", loginUser);

export default router;
