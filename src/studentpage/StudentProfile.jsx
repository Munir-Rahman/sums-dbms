import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon,
  KeyIcon,
  PhotoIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function StudentProfile() {
  const [teacher, setteacher] = useState({
    fullname: "Ahmad Khan",
    email: "teacher@sums.edu",
    phone: "0791234567",
    dob: "1998-04-15",
    address: "Kabul, Afghanistan",
    role: "Teacher",
    department: "Computer Science",
    password: "khan123",
    profileImage: "/Munir_Rahman.jpg",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(teacher);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? URL.createObjectURL(files[0]) : value });
  };

  const handleSave = () => {
    setteacher(form);
    setEditMode(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-12 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={editMode ? form.profileImage : teacher.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-lg object-cover mb-4 border-4 border-indigo-500"
          />
          {!editMode && (
            <h2 className="text-2xl font-bold text-gray-800">{teacher.fullname}</h2>
          )}
          <p className="text-gray-500">{teacher.role}</p>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            icon={<UserIcon />}
            label="Full Name"
            name="fullname"
            value={editMode ? form.fullname : teacher.fullname}
            onChange={handleChange}
            disabled={!editMode}
          />
          <InputField
            icon={<EnvelopeIcon />}
            label="Email"
            name="email"
            value={editMode ? form.email : teacher.email}
            onChange={handleChange}
            disabled={!editMode}
          />
          <InputField
            icon={<PhoneIcon />}
            label="Phone"
            name="phone"
            value={editMode ? form.phone : teacher.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
          <InputField
            icon={<CalendarDaysIcon />}
            label="Date of Birth"
            type="date"
            name="dob"
            value={editMode ? form.dob : teacher.dob}
            onChange={handleChange}
            disabled={!editMode}
          />
          <InputField
            icon={<MapPinIcon />}
            label="Address"
            name="address"
            value={editMode ? form.address : teacher.address}
            onChange={handleChange}
            disabled={!editMode}
          />
          <InputField
            icon={<BriefcaseIcon />}
            label="Department"
            name="department"
            value={editMode ? form.department : teacher.department}
            onChange={handleChange}
            disabled={!editMode}
          />
          <InputField
            icon={<KeyIcon />}
            label="Password"
            type="password"
            name="password"
            value={editMode ? form.password : teacher.password}
            onChange={handleChange}
            disabled={!editMode}
          />

          {/* Image Upload when editMode */}
          {editMode && (
            <div className="col-span-2">
              <label className="text-gray-600 flex items-center gap-2 mb-2">
                <PhotoIcon className="h-5 w-5 text-gray-400" /> Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-600 px-6 py-2 rounded-xl text-white shadow-lg hover:bg-indigo-500"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 px-6 py-2 rounded-xl text-white shadow-lg hover:bg-green-500"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 px-6 py-2 rounded-xl text-white shadow-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Reusable Input Field */
function InputField({ icon, label, name, value, onChange, type = "text", disabled }) {
  return (
    <div className="relative">
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400 h-5 w-5">{icon}</div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition`}
        />
      </div>
    </div>
  );
}
