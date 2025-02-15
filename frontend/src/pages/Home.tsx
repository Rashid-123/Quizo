import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const userId = localStorage.getItem("userId"); // Check if user is logged in

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Quizo</h1>
      <p className="text-gray-600 mb-6">
        Create and manage quizzes effortlessly!
      </p>

      <div className="space-x-4">
        {userId ? (
          <Button asChild className="bg-blue-500 text-white px-6 py-3">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button asChild className="bg-green-500 text-white px-6 py-3">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gray-800 text-white px-6 py-3">
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
