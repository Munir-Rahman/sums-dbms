import React, { useState, useEffect } from "react";
import { UserIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [
      { id: 1, userType: "Student", name: "Munir Rahman", message: "Great classes! I learned a lot this week." },
      { id: 2, userType: "Teacher", name: "Mrs. Fatima", message: "Students are improving well. Need more resources." },
      { id: 3, userType: "Student", name: "Ahmad Khan", message: "The lessons are very interactive!" },
      { id: 4, userType: "Teacher", name: "Mr. Ali", message: "Classes are going smooth. Attendance is better now." },
      { id: 5, userType: "Student", name: "Sara Noor", message: "I like the new topics introduced this week!" },
    ];
    setFeedbacks(savedFeedbacks);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-8 overflow-hidden">
      {/* Glowing Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-md"
      >
        💬 Feedback Board
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-10"
      >
        Here you can view feedback submitted by <span className="text-indigo-600 font-semibold">students</span> and{" "}
        <span className="text-pink-600 font-semibold">teachers</span>.
      </motion.p>

      {/* Feedback Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {feedbacks.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">No feedback yet.</p>
        )}

        {feedbacks.map((f, index) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
            className={`backdrop-blur-md bg-white/70 p-6 rounded-3xl shadow-lg border border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
              f.userType === "Student"
                ? "border-blue-200 hover:border-blue-400"
                : "border-green-200 hover:border-green-400"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div
                className={`p-3 rounded-full ${
                  f.userType === "Student"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {f.userType === "Student" ? (
                  <AcademicCapIcon className="w-7 h-7" />
                ) : (
                  <UserIcon className="w-7 h-7" />
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {f.name}
                </h4>
                <p
                  className={`text-sm font-medium ${
                    f.userType === "Student"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {f.userType}
                </p>
              </div>
            </div>

            <p className="text-gray-700 italic leading-relaxed">
              “{f.message}”
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-gray-500 text-sm mt-10"
      >
        © 2025 Madrasa DBMS — Designed with ❤️ for Learning Growth
      </motion.p>
    </div>
  );
}
