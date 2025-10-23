import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");

  const teachers = [
    {
      id: 1,
      name: "Mrs. Fatima Noor",
      subject: "Mathematics",
      email: "fatima@gmail.com",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 2,
      name: "Mr. Ahmed Khan",
      subject: "Physics",
      email: "ahmed@gmail.com",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      id: 3,
      name: "Ms. Sana Rahimi",
      subject: "Biology",
      email: "sana@gmail.com",
      image: "https://randomuser.me/api/portraits/women/16.jpg",
    },
    {
      id: 4,
      name: "Mr. Khalid Ahmad",
      subject: "Chemistry",
      email: "khalid@gmail.com",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    {
      id: 5,
      name: "Mrs. Hina Wali",
      subject: "English",
      email: "hina@gmail.com",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
      id: 6,
      name: "Mr. Umar Safi",
      subject: "Islamic Studies",
      email: "umar@gmail.com",
      image: "https://randomuser.me/api/portraits/men/19.jpg",
    },
  ];

  // 🔍 Filter teachers based on search input
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen md:mb-0 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-sm text-center">
        Teachers Directory
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, subject, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* 🧑‍🏫 Teacher Cards */}
      {filteredTeachers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:flex md:flex-row md:gap-2 md:flex-wrap">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="md:flex md:items-center md:justify-between md:w-full md:flex-row bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:w-full">
                {/* Teacher Image */}
                {teacher.image ? (
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-sm mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <UserCircleIcon className="w-12 h-12 text-indigo-600" />
                  </div>
                )}

                {/* Teacher Info */}
                <div className="text-center md:text-left md:ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {teacher.name}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-gray-600">
                    <BookOpenIcon className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">{teacher.subject}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-gray-600">
                    <EnvelopeIcon className="w-5 h-5 text-red-500" />
                    <span className="font-medium">{teacher.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2 mt-4 md:mt-0">
                  <button className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-500 transition-all">
                    Delete
                  </button>

                  <Link to={`/admin/teacher/${teacher.id}`}>
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-500 transition-all">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No teachers found.
        </p>
      )}
    </div>
  );
}
