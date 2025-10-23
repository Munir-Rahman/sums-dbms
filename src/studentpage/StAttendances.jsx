import React from "react";
import { motion } from "framer-motion";

export default function AttendanceCalendar() {
  // Example students
  const students = [
    { id: 1, name: "Munir Rahman", roll: "01" },
    { id: 2, name: "Ahmad Khan", roll: "02" },
    { id: 3, name: "Sara Noor", roll: "03" },
    { id: 4, name: "Ali Jan", roll: "04" },
    { id: 5, name: "Fatima Gul", roll: "05" },
  ];

  // Mock attendance data (random for demo)
  const attendanceData = students.map((s) => ({
    id: s.id,
    name: s.name,
    roll: s.roll,
    days: Array.from({ length: 31 }, () => (Math.random() > 0.2 ? "P" : "A")), // P=Present, A=Absent
  }));

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-8">
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-6 drop-shadow-sm"
      >
        🗓 Monthly Attendance - September
      </motion.h1>

      <div className="overflow-x-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky top-0 bg-white/90 backdrop-blur-md border px-3 py-2 text-left z-10">Student</th>
              {days.map((day) => (
                <th
                  key={day}
                  className="sticky top-0 bg-white/90 backdrop-blur-md border px-2 py-2 text-center z-10"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student) => (
              <tr key={student.id} className="hover:bg-indigo-50 transition-all">
                <td className="border px-3 py-2 font-medium text-gray-800">{student.name}</td>
                {student.days.map((status, index) => (
                  <td
                    key={index}
                    className={`border px-2 py-2 text-center font-semibold transition-colors ${
                      status === "P" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    } rounded-lg`}
                  >
                    {status}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-3">
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
          Export PDF
        </button>
        <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
          Export Excel
        </button>
      </div>
    </div>
  );
}
