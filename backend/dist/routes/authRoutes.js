"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.body)("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
], authController_1.registerUser);
router.post("/login", authController_1.loginUser);
exports.default = router;
