import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const navigate = useNavigate();

  const students = [
    { id: 1, name: "Munir Rahman", subject: "Math", date: "2025-09-25" },
    { id: 2, name: "Ali Khan", subject: "Physics", date: "2025-09-26" },
    { id: 3, name: "Sara", subject: "Biology", date: "2025-09-27" },
  ];

  const teachers = [
    { id: 1, name: "Mrs. Fatima", subject: "Math" },
    { id: 2, name: "Mr. Ahmed", subject: "Physics" },
    { id: 3, name: "Ms. Sana", subject: "Biology" },
  ];

  const barData = {
    labels: ["Math", "Pashto", "Dari", "Chemistry"],
    datasets: [
      {
        label: "Students Enrolled",
        data: [5, 7, 4, 3],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ["Math", "Physics", "Biology", "Chemistry"],
    datasets: [
      {
        label: "Teachers per Subject",
        data: [1, 1, 1, 0],
        backgroundColor: [
          "rgba(59, 130, 246, 0.9)",
          "rgba(245, 158, 11, 0.9)",
          "rgba(16, 185, 129, 0.9)",
          "rgba(239, 68, 68, 0.9)",
        ],
        borderWidth: 3,
      },
    ],
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Students Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Subject"]],
      body: students.map((s) => [s.id, s.name, s.subject]),
    });
    doc.save("students-report.pdf");
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students-report.xlsx");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 md:mb-8 text-center drop-shadow-sm">
        📘 Madrasa Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DashboardCard icon={<FaUserGraduate />} title="Students" count={students.length} color="from-blue-500 to-blue-700" />
        <DashboardCard icon={<FaChalkboardTeacher />} title="Teachers" count={teachers.length} color="from-green-500 to-teal-600" />
        <DashboardCard icon={<FaBookOpen />} title="Subjects" count={barData.labels.length} color="from-purple-500 to-indigo-600" />
      </motion.div>

      {/* Charts */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 hover:shadow-2xl transition flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            📊 Students Per Subject
          </h3>
          <div className="w-full h-64 sm:h-80 md:h-64">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 hover:shadow-2xl transition flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            🧑‍🏫 Teachers Distribution
          </h3>
          <div className="w-full h-64 sm:h-80 md:h-64">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </motion.div>

      {/* Reports */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <motion.button whileHover={{ scale: 1.05 }} onClick={downloadPDF} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 transition text-sm sm:text-base">
          <FaDownload /> PDF
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} onClick={downloadExcel} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 transition text-sm sm:text-base">
          <FaDownload /> Excel
        </motion.button>
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-200 overflow-auto max-h-96">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🕒 Recent Enrollments</h3>
        <div className="space-y-3">
          {students.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-white shadow-sm rounded-2xl px-4 py-3 border hover:shadow-md transition text-sm sm:text-base"
            >
              <div>
                <p className="font-semibold text-gray-700">{s.name}</p>
                <p className="text-gray-500">{s.subject}</p>
              </div>
              <span className="text-xs text-gray-400">{s.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, count, color }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={`rounded-3xl shadow-xl bg-gradient-to-br ${color} text-white p-4 sm:p-5 flex flex-col items-center justify-center transition transform`}>
      <div className="text-3xl sm:text-4xl md:text-5xl mb-2 drop-shadow-md">{icon}</div>
      <h4 className="text-md sm:text-lg md:text-lg font-semibold tracking-wide">{title}</h4>
      <p className="text-2xl sm:text-2xl md:text-3xl font-bold mt-1">{count}</p>
    </motion.div>
  );
}
