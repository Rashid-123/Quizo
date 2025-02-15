// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// const API_URL = import.meta.env.VITE_API_URL;

// const Dashboard: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (userId) {
//       axios
//         .get(`${API_URL}/quizzes/${userId}`)
//         .then((res) => setQuizzes(res.data))
//         .catch(() => setError("Failed to fetch quizzes"))
//         .finally(() => setLoading(false));
//     } else {
//       setError("User ID is missing. Please log in.");
//       setLoading(false);
//     }
//   }, [userId]);

//   const handleDelete = async (quizId: string) => {
//     try {
//       await axios.delete(`${API_URL}/quizzes/${quizId}`);
//       setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
//     } catch (err) {
//       setError("Failed to delete quiz.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Your Quizzes</h2>

//       <Button asChild className="mb-6">
//         <Link to="/quiz/create">Create New Quiz</Link>
//       </Button>

//       {loading ? (
//         <div className="grid gap-4">
//           <Skeleton className="h-16 w-full rounded-md" />
//           <Skeleton className="h-16 w-full rounded-md" />
//           <Skeleton className="h-16 w-full rounded-md" />
//         </div>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : quizzes.length === 0 ? (
//         <p className="text-gray-500">No quizzes found.</p>
//       ) : (
//         <div className="grid gap-4">
//           {quizzes.map((quiz) => (
//             <Card key={quiz.id} className="hover:shadow-lg transition-all">
//               <CardHeader>
//                 <CardTitle className="text-lg">{quiz.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex gap-2 mt-4">
//                   <Button asChild variant="outline">
//                     <Link to={`/quiz/${quiz.id}`}>View</Link>
//                   </Button>
//                   <Button asChild variant="default">
//                     <Link to={`/quiz/edit/${quiz.id}`}>Edit</Link>
//                   </Button>
//                   <Button
//                     className="bg-red-500 text-white"
//                     onClick={() => handleDelete(quiz.id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext"; // Import AuthContext

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext); // Get AuthContext
  const userId = auth?.userId; // Extract userId
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${API_URL}/quizzes/${userId}`)
        .then((res) => setQuizzes(res.data))
        .catch(() => setError("Failed to fetch quizzes"))
        .finally(() => setLoading(false));
    } else {
      setError("User ID is missing. Please log in.");
      setLoading(false);
    }
  }, [userId]);

  const handleDelete = async (quizId: string) => {
    try {
      await axios.delete(`${API_URL}/quizzes/${quizId}`);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
    } catch (err) {
      setError("Failed to delete quiz.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Quizzes</h2>

      <Button asChild className="mb-6">
        <Link to="/quiz/create">Create New Quiz</Link>
      </Button>

      {loading ? (
        <div className="grid gap-4">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes found.</p>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mt-4">
                  <Button asChild variant="outline">
                    <Link to={`/quiz/${quiz.id}`}>View</Link>
                  </Button>
                  <Button asChild variant="default">
                    <Link to={`/quiz/edit/${quiz.id}`}>Edit</Link>
                  </Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
