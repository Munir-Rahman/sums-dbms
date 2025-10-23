import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Students() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Example student list (mock data)
  const students = [
    { id: 1, name: "Munir Rahman", grade: "12th", shift: "Morning", image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 2, name: "Ahmad Khan", grade: "11th", shift: "Evening", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 3, name: "Sara Noor", grade: "10th", shift: "AfterNoon", image: "https://randomuser.me/api/portraits/men/6.jpg" },
    { id: 4, name: "Ali Jan", grade: "9th", shift: "Morning", image: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: 5, name: "Ayesha Rahim", grade: "12th", shift: "Evening", image: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 6, name: "Hamid Ullah", grade: "11th", shift: "AfterNoon", image: "https://randomuser.me/api/portraits/men/9.jpg" },
  ];

  // Filter students based on search input
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shift.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-gray-100 min-h-screen mb-8 md:mb-0">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center drop-shadow-sm">
        Students Directory
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, grade, or shift..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Student Cards */}
      {filteredStudents.length > 0 ? (
        <div className="md:flex md:flex-row md:gap-2 md:flex-wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/admin/student/${s.id}`)}
              className="md:flex md:items-center md:justify-between md:w-full md:flex-row group cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:w-full items-center text-center">
                {/* Student Image */}
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-sm mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <UserCircleIcon className="w-12 h-12 text-indigo-600" />
                  </div>
                )}

                {/* Student Info */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {s.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Grade: <span className="font-medium">{s.grade}</span> | Shift:{" "}
                    <span className="font-medium">{s.shift}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-500 transition-all"
                  >
                    Delete
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/student/${s.id}`);
                    }}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-500 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No students found.
        </p>
      )}
    </div>
  );
}
