import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function TeacherStudents() {
  const navigate = useNavigate();

  // Example teacher-related students
  const allStudents = [
    { id: 1, name: "Munir Rahman", grade: "12th", subject: "Math", shift: "Morning", image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 2, name: "Ahmad Khan", grade: "11th", subject: "Physics", shift: "Evening", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 3, name: "Sara Noor", grade: "10th", subject: "Math", shift: "Afternoon", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 4, name: "Haris", grade: "12th", subject: "Math", shift: "Morning", image: "https://randomuser.me/api/portraits/men/7.jpg" },
  ];

  const teacherSubject = "Math"; // Example: Only show Math students
  const [search, setSearch] = useState("");

  // Filter only teacher-related students + search by name
  const students = allStudents.filter(
    (s) =>
      s.subject === teacherSubject &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-center mb-10"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
            👨‍🏫 My Students
          </h1>
          <p className="text-gray-500 text-lg mt-2">
            Showing students for <span className="font-semibold text-indigo-600">{teacherSubject}</span> class
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mt-6 md:mt-0">
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </motion.div>

      {/* Students Grid */}
      {students.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-20 text-lg"
        >
          No students found for this subject 😔
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {students.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/teacher/student/${s.id}`)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl cursor-pointer transition-all border border-gray-100 flex flex-col items-center"
            >
              {/* Student Image */}
              <div className="relative">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-md"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
              </div>

              {/* Student Info */}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {s.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Grade: {s.grade} | {s.shift}
              </p>
              <span className="mt-2 text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full font-medium">
                {s.subject}
              </span>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-red-400"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/student/${s.id}`);
                  }}
                  className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-indigo-500"
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
