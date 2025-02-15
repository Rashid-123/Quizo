"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizController_1 = require("../controllers/quizController");
const router = express_1.default.Router();
router.post("/", quizController_1.createQuiz);
router.get("/:userId", quizController_1.getUserQuizzes);
router.put("/:id", quizController_1.updateQuiz);
router.delete("/:id", quizController_1.deleteQuiz);
exports.default = router;
