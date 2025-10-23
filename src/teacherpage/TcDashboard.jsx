import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaDownload } from "react-icons/fa";
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

export default function TcDashboard() {
  const students = [
    { id: 1, name: "Munir Rahman", class: "10th", avatar: "https://i.pravatar.cc/50?img=1", date: "2025-09-25" },
    { id: 2, name: "Ali Khan", class: "9th", avatar: "https://i.pravatar.cc/50?img=2", date: "2025-09-26" },
    { id: 3, name: "Sara", class: "11th", avatar: "https://i.pravatar.cc/50?img=3", date: "2025-09-27" },
  ];

  const Subjects = [
    { id: 1, subject: "Math", date: "2025-09-20" },
    { id: 2, subject: "Physics", date: "2025-09-21" },
    { id: 3, subject: "Biology", date: "2025-09-22" },
  ];

  // Chart data
  const barData = {
    labels: ["10th", "9th", "11th", "12th"],
    datasets: [
      {
        label: "Students per Class",
        data: [5, 7, 4, 3],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(168, 85, 247, 0.7)",
        ],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Math", "Physics", "Biology", "Chemistry"],
    datasets: [
      {
        label: "Subjects Taught",
        data: [10, 8, 5, 3],
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Report downloads
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Students Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Class"]],
      body: students.map((s) => [s.id, s.name, s.class]),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">
      {/* Header */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center gap-2"
      >
        <FaChalkboardTeacher className="w-10 h-10"/> Teacher Dashboard
      </motion.h1>

      {/* Top Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DashboardCard
          icon={<FaUserGraduate />}
          title="Total Students"
          count={students.length}
          color="from-blue-500 to-blue-700"
        />
        <DashboardCard
          icon={<FaChalkboardTeacher />}
          title="Total Subjects"
          count={Subjects.length}
          color="from-green-500 to-teal-600"
        />
        <DashboardCard
          icon={<FaBookOpen />}
          title="Active Classes"
          count={4}
          color="from-purple-500 to-indigo-600"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📊 Students per Class</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📚 Subject Distribution</h3>
          <Pie data={pieData} />
        </div>
      </motion.div>

      {/* Recent Subjects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 mb-10"
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-5">🧾 Recent Subjects</h3>
        <div className="space-y-4">
          {Subjects.map((s) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={s.id}
              className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">{s.subject}</p>
              <p className="text-gray-500 text-sm">{s.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Download Section */}
      <motion.div
        className="flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-500 transition hover:scale-105"
        >
          <FaDownload /> Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-500 transition hover:scale-105"
        >
          <FaDownload /> Download Excel
        </button>
      </motion.div>
    </div>
  );
}

/* 🔹 Dashboard Card Component */
function DashboardCard({ icon, title, count, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-2xl shadow-lg bg-gradient-to-br ${color} text-white p-6 flex flex-col justify-center items-center transition`}
    >
      <div className="text-4xl mb-3 drop-shadow-lg">{icon}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </motion.div>
  );
}
