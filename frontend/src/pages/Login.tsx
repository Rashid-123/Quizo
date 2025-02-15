import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "@/context/AuthContext"; // Import AuthContext

const API_URL = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)!; // Use AuthContext
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, form);
      login(response.data.userId); // Call login function from AuthContext
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />
      <div className="relative w-full">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <Button
        className="w-full bg-blue-500 text-white py-2 mt-4"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
