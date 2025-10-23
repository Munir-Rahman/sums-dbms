import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaUserCircle, FaLock } from "react-icons/fa";

export default function StudentSettings() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567890",
    password: "",
    newPassword: "",
  });

  // System settings state
  const [system, setSystem] = useState({
    schoolName: "My School",
    theme: "light",
    enableAttendance: true,
    enableSubjects: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystem({ ...system, [name]: type === "checkbox" ? checked : value });
  };

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
    // Here you can call API to update profile
  };

  const handleSaveSystem = () => {
    alert("System settings saved successfully!");
    // Here you can call API to update system settings
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">⚙️ Admin Settings</h2>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <FaUserCircle /> Profile Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 transition"
        >
          <FaSave /> Save Profile
        </button>
      </motion.div>

      {/* System Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <FaLock /> System Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={system.schoolName}
              onChange={handleSystemChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Theme</label>
            <select
              name="theme"
              value={system.theme}
              onChange={handleSystemChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="enableAttendance"
              checked={system.enableAttendance}
              onChange={handleSystemChange}
              className="w-5 h-5"
            />
            <label className="text-gray-600">Enable Attendance Module</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="enableSubjects"
              checked={system.enableSubjects}
              onChange={handleSystemChange}
              className="w-5 h-5"
            />
            <label className="text-gray-600">Enable Subjects Module</label>
          </div>
        </div>
        <button
          onClick={handleSaveSystem}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-500 transition"
        >
          <FaSave /> Save System Settings
        </button>
      </motion.div>
    </div>
  );
}
