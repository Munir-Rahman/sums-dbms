import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Addmarks() {
  const [marks, setMarks] = useState([{ studentName: "", subject: "", score: "" }]);

  const handleAddRow = () => {
    setMarks([...marks, { studentName: "", subject: "", score: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newMarks = [...marks];
    newMarks[index][field] = value;
    setMarks(newMarks);
  };

  const handleSubmit = () => {
    console.log(marks);
    alert("Marks submitted successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 bg-gray-50 min-h-screen"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        📚 Add Student Marks
      </h1>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 space-y-4">
        {marks.map((entry, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4 border-gray-200"
          >
            <input
              type="text"
              placeholder="Student Name"
              value={entry.studentName}
              onChange={(e) => handleChange(index, "studentName", e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="text"
              placeholder="Subject"
              value={entry.subject}
              onChange={(e) => handleChange(index, "subject", e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="number"
              placeholder="Marks"
              value={entry.score}
              onChange={(e) => handleChange(index, "score", e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleAddRow}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            + Add Another
          </button>
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            <CheckCircleIcon className="w-5 h-5" /> Submit Marks
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
