import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import CreateQuiz from "@/pages/CreateQuiz";
import EditQuiz from "@/pages/EditQuiz";
import QuizRead from "@/pages/QuizRead";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz/create" element={<CreateQuiz />} />
      <Route path="/quiz/edit/:id" element={<EditQuiz />} />
      <Route path="/quiz/:id" element={<QuizRead />} />
    </Routes>
  );
};

export default AppRoutes;
