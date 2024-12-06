"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  // const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username.trim());
      router.push("/");
    } else {
      alert("Please enter a username.");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) router.push("/");
  }, [router]);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
