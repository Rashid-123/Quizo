import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AuthContext } from "@/context/AuthContext"; // Import AuthContext

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext)!;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold hover:text-gray-300 transition"
        >
          Quizo
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <Button asChild className="px-4 py-2">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="px-4 py-2">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="px-4 py-2">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4 border-t border-gray-700">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="text-lg text-red-400 hover:text-red-500"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
