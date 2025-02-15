"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://quizo-phi.vercel.app",
    process.env.FRONTEND_URL,
]; // Add multiple origins
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allows cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
}));
app.use(body_parser_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/quizzes", quizRoutes_1.default);
app.listen(5000, () => console.log("Server running on port 5000"));
