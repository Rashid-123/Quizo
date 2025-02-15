import { Request, Response } from "express";
import prisma from "../config/db_connection"; // ✅ Import database connection

export const createQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Incoming request body:", req.body); // Debugging

    const { title, description, userId } = req.body;

    // Validate input
    if (!title || !description || !userId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const quiz = await prisma.quiz.create({
      data: { title, description, userId },
    });

    res.json({ success: true, message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);

    // Explicitly cast error to `Error`
    const err = error as Error;

    res.status(500).json({
      message: "Internal server error",
      error: err.message || "Unknown error",
    });
  }
};

// Get quizzes for a user
export const getUserQuizzes = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const quizzes = await prisma.quiz.findMany({
      where: { userId },
    });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
};

// Get a single quiz by ID
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const { title, description } = req.body;

    const quiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { title, description },
    });

    res.json({ success: true, message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    res.json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
};
