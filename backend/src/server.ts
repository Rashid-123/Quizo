import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import quizRoutes from "./routes/quizRoutes";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL]; // Add multiple origins

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  })
);

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
