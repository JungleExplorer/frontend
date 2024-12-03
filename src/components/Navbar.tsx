import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-yellow-500 text-white fixed top-0 w-full z-10 shadow">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold">
          Amazon Explorer
        </Link>
        <Link to="/login" className="text-sm hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
