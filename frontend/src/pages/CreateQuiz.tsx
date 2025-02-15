// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import styles for React Quill

// const API_URL = import.meta.env.VITE_API_URL; // Get API URL from .env

// const CreateQuiz: React.FC = () => {
//   const [quizTitle, setQuizTitle] = useState("");
//   const [description, setDescription] = useState(""); // Now supports formatted text
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Fetch user ID from local storage
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       setError("User not authenticated. Please log in.");
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!quizTitle.trim() || !description.trim()) {
//       setError("Both fields are required!");
//       return;
//     }

//     if (!userId) {
//       setError("User ID is missing. Please log in again.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const response = await axios.post(`${API_URL}/quizzes`, {
//         title: quizTitle,
//         description,
//         userId: parseInt(userId, 10), // Convert to integer before sending
//       });

//       console.log("Quiz Created:", response.data);

//       // Reset fields
//       setQuizTitle("");
//       setDescription("");

//       // Navigate to dashboard after quiz creation
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Error creating quiz:", err);
//       setError("Failed to create quiz. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-md p-6 shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <Input
//               type="text"
//               placeholder="Quiz Title"
//               value={quizTitle}
//               onChange={(e) => setQuizTitle(e.target.value)}
//             />

//             <ReactQuill
//               theme="snow"
//               value={description}
//               onChange={setDescription}
//               placeholder="Write your description..."
//               className="bg-white"
//               style={{ height: "250px", marginBottom: "50px" }}
//             />

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 animate-spin" size={16} /> Saving...
//                 </>
//               ) : (
//                 "Save Quiz"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreateQuiz;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import { AuthContext } from "@/context/AuthContext"; // Import AuthContext

const API_URL = import.meta.env.VITE_API_URL; // Get API URL from .env

const CreateQuiz: React.FC = () => {
  const auth = useContext(AuthContext); // Access AuthContext
  const userId = auth?.userId; // Get userId from AuthContext
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState(""); // Supports formatted text
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
        userId, // No need to convert, userId is already a string
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
