import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username"); // localStorage에서 username 제거
    navigate("/login"); // 로그인 페이지로 리다이렉트
  };

  return (
    <nav className="bg-yellow-500 text-white fixed top-0 w-full z-10 shadow">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold text-white">
          Jungle Explorer
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-200">
            {localStorage.getItem("username") || "Guest"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
