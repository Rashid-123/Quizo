import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppRoutes from "./Router";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen p-4">
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
};

export default App;
