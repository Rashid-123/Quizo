"use strict";
// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app: Application = express(); // ✅ Define `app` as `Application`
// const prisma = new PrismaClient();
// app.use(cors());
// app.use(bodyParser.json());
// // Define types for request bodies
// interface RegisterRequestBody {
//   username: string;
//   password: string;
// }
// interface QuizRequestBody {
//   title: string;
//   description: string;
//   userId: number;
// }
// // ✅ Fix: Change from `app.post("/register", async (req: Request, res: Response) => {`
// //          to `app.post("/register", (req, res) => {`
// app.post("/register", async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body as RegisterRequestBody; // ✅ Explicitly cast `req.body`
//     const existingUser = await prisma.user.findUnique({ where: { username } });
//     if (existingUser)
//       return res.status(400).json({ message: "Username already exists" });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { username, password: hashedPassword },
//     });
//     res.json({ success: true, message: "User registered", userId: user.id });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// });
// // ✅ Fix: Explicitly cast `req.body`
// app.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body as RegisterRequestBody;
//     const user = await prisma.user.findUnique({ where: { username } });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.status(401).json({ message: "Invalid credentials" });
//     res.json({ success: true, message: "Login successful", userId: user.id });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }
// });
// // ✅ Fix: Explicitly cast `req.body`
// app.post("/quizzes", async (req: Request, res: Response) => {
//   try {
//     const { title, description, userId } = req.body as QuizRequestBody;
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     const quiz = await prisma.quiz.create({
//       data: { title, description, userId },
//     });
//     res.json({ success: true, message: "Quiz created successfully", quiz });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating quiz", error });
//   }
// });
// // ✅ Fix: `req.params.userId` should be explicitly converted to `number`
// app.get("/quizzes/:userId", async (req: Request, res: Response) => {
//   try {
//     const userId = Number(req.params.userId);
//     const quizzes = await prisma.quiz.findMany({
//       where: { userId },
//     });
//     res.json(quizzes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching quizzes", error });
//   }
// });
// // ✅ Fix: `req.params.id` should be explicitly converted to `number`
// app.put("/quizzes/:id", async (req: Request, res: Response) => {
//   try {
//     const quizId = Number(req.params.id);
//     const { title, description } = req.body as QuizRequestBody;
//     const quiz = await prisma.quiz.update({
//       where: { id: quizId },
//       data: { title, description },
//     });
//     res.json({ success: true, message: "Quiz updated successfully", quiz });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating quiz", error });
//   }
// });
// // ✅ Fix: `req.params.id` should be explicitly converted to `number`
// app.delete("/quizzes/:id", async (req: Request, res: Response) => {
//   try {
//     const quizId = Number(req.params.id);
//     await prisma.quiz.delete({
//       where: { id: quizId },
//     });
//     res.json({ success: true, message: "Quiz deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting quiz", error });
//   }
// });
// app.listen(5000, () => console.log("Server running on port 5000"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Use API routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/quizzes", quizRoutes_1.default);
app.listen(5000, () => console.log("Server running on port 5000"));
