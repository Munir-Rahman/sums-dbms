import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function TakeAttendance() {
  const { attendanceId } = useParams();
  const navigate = useNavigate();

  const attendanceTitles = {
    class5: "Class 5 Attendance",
    class8: "Class 8 Attendance",
    math: "Mathematics Attendance",
    physics: "Physics Attendance",
    chemistry: "Chemistry Attendance",
    cs: "Computer Science Attendance",
  };

  const title = attendanceTitles[attendanceId] || "Attendance";

  // Mock students
  const students = [
    { id: 1, name: "Munir Rahman", roll: "S001", image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 2, name: "Ahmad Khan", roll: "S002", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 3, name: "Sara Noor", roll: "S003", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 4, name: "Ali Jan", roll: "S004", image: "https://randomuser.me/api/portraits/men/7.jpg" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Track attendance
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = {};
      days.forEach((d) => (acc[student.id][d] = null));
      return acc;
    }, {})
  );

  // Track selected day
  const [selectedDay, setSelectedDay] = useState(1);

  const handleAttendance = (studentId, day, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [day]: status },
    }));
  };

  const markAllPresent = () => {
    setAttendance((prev) => {
      const updated = { ...prev };
      students.forEach((s) => {
        updated[s.id][selectedDay] = "present";
      });
      return updated;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl shadow-md transition"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          Back
        </button>

        <div className="text-center flex-1">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-extrabold text-gray-800"
          >
            🧾 {title}
          </motion.h1>
          <p className="text-gray-600 mt-2 text-lg">
            Mark attendance for all students in {title}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
          >
            {days.map((d) => (
              <option key={d} value={d}>Day {d}</option>
            ))}
          </select>

          <button
            onClick={markAllPresent}
            className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl shadow-md transition font-semibold"
          >
            Mark All Present
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-4">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-4 rounded-tl-2xl">Image</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Roll</th>
              {days.map((d) => (
                <th key={d} className={`py-2 px-2 ${d === selectedDay ? "bg-indigo-100 text-indigo-800" : ""}`}>
                  {d}
                </th>
              ))}
              <th className="py-3 px-4 rounded-tr-2xl">Summary</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, idx) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b hover:bg-indigo-50 transition"
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-10 h-10 rounded-full border-2 border-indigo-200"
                  />
                </td>
                <td><span className="font-medium text-gray-800">{student.name}</span></td>
                <td className="py-3 px-4 text-gray-700">{student.roll}</td>

                {days.map((d) => (
                  <td key={d} className="py-2 px-2">
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleAttendance(student.id, d, "present")}
                        className={`p-1 rounded-md transition ${
                          attendance[student.id][d] === "present"
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                        title="Present"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAttendance(student.id, d, "absent")}
                        className={`p-1 rounded-md transition ${
                          attendance[student.id][d] === "absent"
                            ? "bg-red-500 text-white shadow-lg"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                        title="Absent"
                      >
                        <XCircleIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                ))}

                <td className="py-3 px-4 font-semibold text-gray-800">
                  {Object.values(attendance[student.id]).filter((a) => a === "present").length}/31
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("✅ Attendance saved successfully!")}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-indigo-500 transition"
        >
          Save Attendance
        </motion.button>
      </div>
    </motion.div>
  );
}
