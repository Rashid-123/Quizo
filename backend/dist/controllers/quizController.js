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
exports.deleteQuiz = exports.updateQuiz = exports.getUserQuizzes = exports.createQuiz = void 0;
const db_connection_1 = __importDefault(require("../config/db_connection")); // ✅ Import database connection
// Create a quiz
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, userId } = req.body;
        const user = yield db_connection_1.default.user.findUnique({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const quiz = yield db_connection_1.default.quiz.create({
            data: { title, description, userId },
        });
        res.json({ success: true, message: "Quiz created successfully", quiz });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating quiz", error });
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
