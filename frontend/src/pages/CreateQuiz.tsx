import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
const CreateQuiz: React.FC = () => {
  const auth = useContext(AuthContext);
  const userId = auth?.userId;
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError("User not authenticated. Please log in.");
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quizTitle.trim() || !description.trim()) {
      setError("Both fields are required!");
      return;
    }

    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/quizzes`, {
        title: quizTitle,
        description,
        userId,
      });

      console.log("Quiz Created:", response.data);

      // Reset fields
      setQuizTitle("");
      setDescription("");

      // Navigate to dashboard after quiz creation
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating quiz:", err);
      setError("Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
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
              placeholder="Write your description..."
              className="bg-white"
              style={{ height: "250px", marginBottom: "50px" }}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} /> Saving...
                </>
              ) : (
                "Save Quiz"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuiz;
