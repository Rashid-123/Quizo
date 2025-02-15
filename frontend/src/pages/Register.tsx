// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "@/components/ui/button";

// const API_URL = import.meta.env.VITE_API_URL; // Get API URL from .env

// const Register: React.FC = () => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     try {
//       await axios.post(`${API_URL}/register`, form);
//       setSuccess("User registered successfully! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
//     } catch (err) {
//       setError("Registration failed. Username may already exist.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto text-center">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>

//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <input
//         name="username"
//         placeholder="Username"
//         onChange={handleChange}
//         className="w-full p-2 border mb-2 rounded"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//         className="w-full p-2 border mb-4 rounded"
//       />

//       <Button
//         className="w-full bg-green-500 text-white py-2"
//         onClick={handleRegister}
//       >
//         Register
//       </Button>

//       <p className="mt-4">
//         Already have an account?{" "}
//         <a href="/login" className="text-blue-500">
//           Login
//         </a>
//       </p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/register`, form);
      setSuccess("User registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Registration failed. Username may already exist.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded"
      />

      <Button
        className="w-full bg-green-500 text-white py-2"
        onClick={handleRegister}
      >
        Register
      </Button>

      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
