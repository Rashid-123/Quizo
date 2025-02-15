import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill

const API_URL = import.meta.env.VITE_API_URL; // Get API URL from .env

const EditQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizId = Number(id);
        if (isNaN(quizId)) throw new Error("Invalid quiz ID");

        const response = await axios.get(`${API_URL}/quizzes/quiz/${quizId}`);
        setQuizTitle(response.data.title);
        setDescription(response.data.description);
      } catch (err) {
        setError("Failed to fetch quiz. Please try again.");
      } finally {
        setFetching(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim() || !description.trim()) {
      setError("Both fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const quizId = Number(id);
      await axios.put(`${API_URL}/quizzes/${quizId}`, {
        title: quizTitle,
        description,
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Quiz</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />

            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Edit your description..."
              className="bg-white"
              style={{ height: "250px", marginBottom: "50px" }}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />{" "}
                  Updating...
                </>
              ) : (
                "Update Quiz"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditQuiz;
