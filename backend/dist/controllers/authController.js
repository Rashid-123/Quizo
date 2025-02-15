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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_connection_1 = __importDefault(require("../config/db_connection")); // ✅ Import database connection
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield db_connection_1.default.user.findUnique({ where: { username } });
        if (existingUser)
            return res.status(400).json({ message: "Username already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield db_connection_1.default.user.create({
            data: { username, password: hashedPassword },
        });
        res.json({ success: true, message: "User registered", userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield db_connection_1.default.user.findUnique({ where: { username } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid credentials" });
        res.json({ success: true, message: "Login successful", userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});
exports.loginUser = loginUser;
