import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../config/db_connection";

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { username, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.json({ success: true, message: "User registered", userId: user.id });
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};

// Login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json({ success: true, message: "Login successful", userId: user.id });
  } catch (error) {
    next(error);
  }
};
