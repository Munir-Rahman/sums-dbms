import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function ApplySuggestion() {
  const navigate = useNavigate();

  const [appliedStudents] = useState([
    { id: 1, name: "Munir Rahman", program: "Computer Science", message: "I want to pursue higher education here." },
    { id: 2, name: "Ahmad Khan", program: "Business Administration", message: "Looking forward to joining this university." },
    { id: 3, name: "Sara Noor", program: "Medicine", message: "Dreaming to become a doctor." },
    { id: 4, name: "Hina Gul", program: "Engineering", message: "Passionate about building future tech." },
    { id: 5, name: "Ali Raza", program: "Artificial Intelligence", message: "AI will shape our world." },
  ]);

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 overflow-hidden">
      {/* background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-56 h-56 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-purple-300 opacity-30 blur-3xl rounded-full"></div>
      </div>

      {/* Page Header */}
      <div className="relative z-10 mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 drop-shadow-md flex items-center gap-3">
          <AcademicCapIcon className="w-10 h-10 text-indigo-600" />
          Applied Students
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          List of students who have applied to the institution.
          <br />
          <span className="text-indigo-600 font-semibold">(Admin cannot add students here.)</span>
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appliedStudents.map((student, index) => (
          <motion.div
            key={student.id}
            onClick={() => navigate(`/admin/applyinfo/${student.id}`)}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(99,102,241,0.25)",
            }}
            className="cursor-pointer backdrop-blur-md bg-white/60 border border-white/30 shadow-lg rounded-3xl p-6 transition-all duration-300 hover:bg-white/80 hover:border-indigo-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl shadow-md">
                <AcademicCapIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{student.name}</h4>
                <span className="text-sm text-indigo-600 font-medium">{student.program}</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm italic leading-relaxed">{student.message}</p>
          </motion.div>
        ))}
      </div>

      {appliedStudents.length === 0 && (
        <div className="text-center mt-20 text-gray-500 text-lg">No applications yet.</div>
      )}
    </div>
  );
}
