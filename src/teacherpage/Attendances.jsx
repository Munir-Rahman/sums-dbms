import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenIcon, UsersIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Attendances() {
  const navigate = useNavigate();

  // Example data for classes & subjects
  const attendanceList = [
    { id: 1, title: "Class 5 Attendance", icon: <UsersIcon className="h-8 w-8" />, path: "/attendance/class5" },
    { id: 2, title: "Class 8 Attendance", icon: <UsersIcon className="h-8 w-8" />, path: "/attendance/class8" },
    { id: 3, title: "Mathematics Attendance", icon: <BookOpenIcon className="h-8 w-8" />, path: "/attendance/math" },
    { id: 4, title: "Physics Attendance", icon: <BookOpenIcon className="h-8 w-8" />, path: "/attendance/physics" },
    { id: 5, title: "Chemistry Attendance", icon: <BookOpenIcon className="h-8 w-8" />, path: "/attendance/chemistry" },
    { id: 6, title: "Computer Science Attendance", icon: <BookOpenIcon className="h-8 w-8" />, path: "/attendance/cs" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-10"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-extrabold text-gray-800 tracking-tight"
        >
          📚 All Classes & Subjects Attendances
        </motion.h1>
        <p className="text-gray-500 mt-2 text-lg">
          Click on any class or subject to view detailed attendance records.
        </p>
      </div>

      {/* Attendance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {attendanceList.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white/70 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition"
          >
            <div className="text-indigo-600 mb-3">{item.icon}</div>
            <h2 className="text-lg font-bold text-gray-800 text-center">{item.title}</h2>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              <CalendarDaysIcon className="h-4 w-4 text-gray-400" /> View Attendance
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
