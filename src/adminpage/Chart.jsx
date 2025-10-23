import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Students Admission",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Daily Attendance",
        data: [20, 25, 22, 30, 28],
        borderColor: "rgba(236, 72, 153, 1)",
        backgroundColor: "rgba(236, 72, 153, 0.2)",
        tension: 0.4,
        fill: true,
        pointBorderWidth: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ["Math", "Physics", "Chemistry", "Biology"],
    datasets: [
      {
        label: "Subject Enrollment",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(250, 204, 21, 0.7)",
        ],
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: "#374151", font: { size: 13, weight: "600" } },
      },
    },
    scales: {
      x: { ticks: { color: "#6B7280" }, grid: { color: "rgba(0,0,0,0.05)" } },
      y: { ticks: { color: "#6B7280" }, grid: { color: "rgba(0,0,0,0.05)" } },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-6 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-indigo-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-md text-center"
      >
        📊 School Analytics Dashboard
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
          className="backdrop-blur-md bg-white/70 p-6 rounded-3xl shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="font-semibold text-lg mb-3 text-indigo-600">
            Students Admission (Bar)
          </h3>
          <Bar data={barData} options={chartOptions} />
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="backdrop-blur-md bg-white/70 p-6 rounded-3xl shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="font-semibold text-lg mb-3 text-pink-600">
            Daily Attendance (Line)
          </h3>
          <Line data={lineData} options={chartOptions} />
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
          className="backdrop-blur-md bg-white/70 p-6 rounded-3xl shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="font-semibold text-lg mb-3 text-green-600">
            Subject Enrollment (Pie)
          </h3>
          <Pie data={pieData} options={chartOptions} />
        </motion.div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-sm mt-10">
        © 2025 School DBMS Dashboard — Data Visualization powered by Chart.js
      </p>
    </div>
  );
}
