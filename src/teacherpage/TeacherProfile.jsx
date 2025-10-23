import React from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function TeacherProfile() {
  const teacher = {
    fullname: "Ahmad Khan",
    email: "teacher@sums.edu",
    phone: "0791234567",
    dob: "1998-04-15",
    address: "Kabul, Afghanistan",
    role: "Teacher",
    department: "Computer Science",
    profileImage: "/Munir_Rahman.jpg",
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center p-10"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative backdrop-blur-2xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl p-10 w-full max-w-4xl"
      >
        {/* Glowing Background Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={teacher.profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-2xl object-cover border-4 border-indigo-500"
          />
          <h2 className="text-3xl font-extrabold text-gray-800 mt-5">
            {teacher.fullname}
          </h2>
          <p className="text-indigo-500 font-semibold mt-1 text-lg">
            {teacher.department} Department
          </p>
          <span className="text-sm text-gray-500 mt-1">{teacher.role}</span>
        </div>

        {/* Info Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ProfileField
            icon={<UserIcon />}
            label="Full Name"
            value={teacher.fullname}
          />
          <ProfileField
            icon={<EnvelopeIcon />}
            label="Email"
            value={teacher.email}
          />
          <ProfileField
            icon={<PhoneIcon />}
            label="Phone"
            value={teacher.phone}
          />
          <ProfileField
            icon={<CalendarDaysIcon />}
            label="Date of Birth"
            value={teacher.dob}
          />
          <ProfileField
            icon={<MapPinIcon />}
            label="Address"
            value={teacher.address}
          />
          <ProfileField
            icon={<BriefcaseIcon />}
            label="Department"
            value={teacher.department}
          />
        </motion.div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <button
          onClick={handleLogout}
          className="flex items-center gap-3 font-bold text-white px-3 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition"
          >
            LogOut
            </button>
          <p className="text-gray-500 text-sm italic">
             Only Admins can modify this profile information.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ✅ Reusable Field Component */
function ProfileField({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/60 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-indigo-500 h-5 w-5">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </h3>
      </div>
      <p className="text-gray-800 text-lg font-medium">{value}</p>
    </motion.div>
  );
}
