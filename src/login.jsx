// ModernSchoolLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaUser, FaUsers } from "react-icons/fa";

export default function ModernSchoolLogin() {
  const navigate = useNavigate();

  const roles = [
    { key: "ADMIN", label: "Administrator", icon: <FaUsers size={28} />, color: "bg-blue-500" },
    { key: "TEACHER", label: "Teacher", icon: <FaChalkboardTeacher size={28} />, color: "bg-green-500" },
    { key: "STUDENT", label: "Student", icon: <FaUserGraduate size={28} />, color: "bg-yellow-500" },
    { key: "PARENT", label: "Parent", icon: <FaUser size={28} />, color: "bg-purple-500" },
  ];

  const [role, setRole] = useState("STUDENT");
  const [studentId, setStudentId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (role === "PARENT") {
      if (!studentId.trim()) {
        setMessage("Please enter your Student ID!");
        return;
      }
      setMessage("");
      navigate("/parent");
    } else {
      if (!username.trim() || !password.trim()) {
        setMessage("Please enter username and password!");
        return;
      }
      setMessage("");
      navigate(`/${role.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Roles */}
        <div className="md:w-2/5 bg-indigo-900 text-white flex flex-col items-center p-8 gap-6">
          <div className="text-center">
            <img
              src="/sums.png"
              alt="Logo"
              className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg ring-4 ring-indigo-500"
            />
            <h2 className="text-3xl font-bold">SUMS SYSTEM</h2>
            <p className="mt-2 text-sm text-indigo-300">Select Your Role</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            {roles.map((r) => (
              <div
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer transform transition duration-300 hover:scale-105 ${
                  role === r.key ? "shadow-2xl border-4 border-white" : ""
                } ${r.color}`}
              >
                <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md">{r.icon}</div>
                <span className="font-semibold text-center">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-3/5 p-10 flex flex-col justify-center gap-6 relative">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{role} Login</h2>

          {role === "PARENT" ? (
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="border-2 border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-md transition duration-300 hover:shadow-md"
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-md transition duration-300 hover:shadow-md"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-md transition duration-300 hover:shadow-md"
              />
            </>
          )}

          {message && <p className="text-red-500 font-semibold text-center">{message}</p>}

          <button
            onClick={handleLogin}
            className="bg-indigo-900 text-white p-3 rounded-2xl font-semibold hover:bg-indigo-800 transition duration-300 text-md mt-2 shadow-lg hover:shadow-xl"
          >
            Login
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-400">
            © 2025 SUMS SYSTEM | All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}
