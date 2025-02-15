import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL; // Get API URL from .env

const QuizRead: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizId = Number(id);
        if (isNaN(quizId)) throw new Error("Invalid quiz ID");

        const response = await axios.get(`${API_URL}/quizzes/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading)
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-red-100 text-red-700 border border-red-300 p-4 rounded-md">
        <h2 className="font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );

  if (!quiz) return <div className="p-6 text-gray-500">Quiz not found.</div>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-blue-500 text-lg md:text-xl font-semibold">
            {quiz.title}
          </CardTitle>
        </CardHeader>
        <CardContent>{parse(quiz.description)}</CardContent>
      </Card>
    </div>
  );
};

export default QuizRead;
