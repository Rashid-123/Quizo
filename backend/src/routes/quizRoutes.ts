import express from "express";
import {
  createQuiz,
  getUserQuizzes,
  updateQuiz,
  deleteQuiz,
  getQuizById,
} from "../controllers/quizController";

const router = express.Router();

router.post("/", createQuiz);
router.get("/:userId", getUserQuizzes);
router.get("/quiz/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
