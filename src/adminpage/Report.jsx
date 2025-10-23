import React from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { FileDown, FileSpreadsheet, Download } from "lucide-react";

export default function Reports() {
  const students = [
    { id: 1, name: "Munir Rahman", class: "10th", email: "munir@gmail.com" },
    { id: 2, name: "Ali Khan", class: "9th", email: "ali@gmail.com" },
    { id: 3, name: "Sana Noor", class: "8th", email: "sana@gmail.com" },
    { id: 4, name: "Ahmad", class: "11th", email: "ahmad@gmail.com" },
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Students Report", 20, 20);
    doc.setFontSize(12);
    let row = 35;
    students.forEach((s) => {
      doc.text(`${s.id}. ${s.name} - ${s.class} - ${s.email}`, 20, row);
      row += 10;
    });
    doc.save("students_report.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      "students_report.xlsx"
    );
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <motion.div
        className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          📊 Madrasa Students Feedback & Reports
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button
            onClick={exportPDF}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <FileDown className="w-5 h-5" />
            Download PDF
          </motion.button>
          <motion.button
            onClick={exportExcel}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <FileSpreadsheet className="w-5 h-5" />
            Download Excel
          </motion.button>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-xl border border-gray-200 shadow-lg bg-white">
          <table className="w-full text-center border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="p-3 border border-blue-200">ID</th>
                <th className="p-3 border border-blue-200">Name</th>
                <th className="p-3 border border-blue-200">Class</th>
                <th className="p-3 border border-blue-200">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <motion.tr
                  key={s.id}
                  className={`hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-blue-50/40"
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="p-3 border">{s.id}</td>
                  <td className="p-3 border font-semibold text-gray-700">
                    {s.name}
                  </td>
                  <td className="p-3 border text-blue-600 font-medium">
                    {s.class}
                  </td>
                  <td className="p-3 border text-gray-600">{s.email}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Powered by <span className="font-semibold text-blue-600">Madrasa System DBMS</span> | Teacher Feedback & Student Report
          </p>
        </div>
      </motion.div>
    </div>
  );
}
