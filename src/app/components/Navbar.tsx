"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("Guest");

  useEffect(() => {
    // 브라우저에서만 localStorage에 접근
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); // localStorage에서 username 제거
    router.push("/login"); // 로그인 페이지로 리다이렉트
  };

  return (
    <nav className="bg-yellow-500 text-white fixed top-0 w-full z-10 shadow">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          Jungle Explorer
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-200">
            {username}
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
