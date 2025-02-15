"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuizById = exports.getUserQuizzes = exports.createQuiz = void 0;
const db_connection_1 = __importDefault(require("../config/db_connection")); // ✅ Import database connection
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming request body:", req.body); // Debugging
        const { title, description, userId } = req.body;
        // Validate input
        if (!title || !description || !userId) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const user = yield db_connection_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const quiz = yield db_connection_1.default.quiz.create({
            data: { title, description, userId },
        });
        res.json({ success: true, message: "Quiz created successfully", quiz });
    }
    catch (error) {
        console.error("Error creating quiz:", error);
        // Explicitly cast error to `Error`
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message || "Unknown error",
        });
    }
});
exports.createQuiz = createQuiz;
// Get quizzes for a user
const getUserQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const quizzes = yield db_connection_1.default.quiz.findMany({
            where: { userId },
        });
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching quizzes", error });
    }
});
exports.getUserQuizzes = getUserQuizzes;
// Get a single quiz by ID
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = Number(req.params.id);
        const quiz = yield db_connection_1.default.quiz.findUnique({
            where: { id: quizId },
        });
        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching quiz", error });
    }
});
exports.getQuizById = getQuizById;
// Update a quiz
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = Number(req.params.id);
        const { title, description } = req.body;
        const quiz = yield db_connection_1.default.quiz.update({
            where: { id: quizId },
            data: { title, description },
        });
        res.json({ success: true, message: "Quiz updated successfully", quiz });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating quiz", error });
    }
});
exports.updateQuiz = updateQuiz;
// Delete a quiz
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = Number(req.params.id);
        yield db_connection_1.default.quiz.delete({
            where: { id: quizId },
        });
        res.json({ success: true, message: "Quiz deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting quiz", error });
    }
});
exports.deleteQuiz = deleteQuiz;
