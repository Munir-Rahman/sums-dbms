import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
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

export default function StDashboard() {
  const students = [
    { id: 1, name: "Munir Rahman", class: "10th", avatar: "https://i.pravatar.cc/50?img=1", date: "2025-09-25" },
    { id: 2, name: "Ali Khan", class: "9th", avatar: "https://i.pravatar.cc/50?img=2", date: "2025-09-26" },
    { id: 3, name: "Sara", class: "11th", avatar: "https://i.pravatar.cc/50?img=3", date: "2025-09-27" },
    { id: 4, name: "Sara", class: "11th", avatar: "https://i.pravatar.cc/50?img=3", date: "2025-09-27" },
  ];

  const Subjects = [
    { id: 1, subject: "Math", date: "2025-09-20" },
    { id: 2, subject: "Physics", date: "2025-09-21" },
    { id: 3, subject: "Biology", date: "2025-09-22" },
    { id: 4, subject: "Chemistry", date: "2025-09-22" },
  ];

  const barData = {
    labels: ["10th", "9th", "11th", "12th"],
    datasets: [
      {
        label: "Number of Students",
        data: [50, 70, 40, 30],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Math", "Physics", "Biology", "Chemistry"],
    datasets: [
      {
        label: "# of Teachers",
        data: [92, 55, 73, 100],
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
        borderWidth: 2,
      },
    ],
  };

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
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center drop-shadow-sm">
        🎓 Student Dashboard
      </h2>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
      </motion.div>

      {/* Recent Subjects */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 Recent Subjects</h3>
        <div className="space-y-3">
          {Subjects.map((sub) => (
            <motion.div
              key={sub.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-white shadow-sm rounded-2xl px-4 py-3 border hover:shadow-md transition"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-700">{sub.subject}</p>
                <p className="text-gray-500 text-sm">{sub.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-6 hover:shadow-2xl transition">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            📊 Students per Class
          </h3>
          <div className="h-64 md:h-80">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-6 hover:shadow-2xl transition">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            🧑‍🏫 Subjects Distribution
          </h3>
          <div className="h-64 md:h-80">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Download Reports */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-500 transition"
        >
          Download PDF
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-500 transition"
        >
          Download Excel
        </motion.button>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, count, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-3xl shadow-xl bg-gradient-to-br ${color} text-white p-6 flex flex-col items-center justify-center transition transform`}
    >
      <div className="text-5xl mb-2 drop-shadow-md">{icon}</div>
      <h4 className="text-lg md:text-xl font-semibold tracking-wide">{title}</h4>
      <p className="text-3xl md:text-4xl font-bold mt-2">{count}</p>
    </motion.div>
  );
}
