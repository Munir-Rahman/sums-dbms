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
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [admin, setAdmin] = useState({
    fullname: "Eng. Munir Rahman",
    email: "admin@sums.edu",
    phone: "0791234567",
    dob: "1998-04-15",
    address: "Kabul, Afghanistan",
    role: "Administrator",
    department: "Computer Science",
    password: "********",
    profileImage: "https://i.pravatar.cc/300",
  });
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(admin);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? URL.createObjectURL(files[0]) : value });
  };

  const handleSave = () => {
    setAdmin(form);
    setEditMode(false);
    alert("✅ Profile updated successfully!");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6 md:p-12 flex flex-col items-center"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/admin")}
        className="self-start mb-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-2xl shadow-lg transition"
      >
        ← Back
      </motion.button>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-8">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={editMode ? form.profileImage : admin.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">{admin.fullname}</h2>
            <p className="text-indigo-600 font-semibold text-lg">{admin.role}</p>
            <p className="text-gray-500 mt-2">{admin.department}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField icon={<UserIcon className="w-5 h-5 text-indigo-500" />} label="Full Name" name="fullname" value={editMode ? form.fullname : admin.fullname} onChange={handleChange} disabled={!editMode} />
          <InputField icon={<EnvelopeIcon className="w-5 h-5 text-indigo-500" />} label="Email" name="email" value={editMode ? form.email : admin.email} onChange={handleChange} disabled={!editMode} />
          <InputField icon={<PhoneIcon className="w-5 h-5 text-indigo-500" />} label="Phone" name="phone" value={editMode ? form.phone : admin.phone} onChange={handleChange} disabled={!editMode} />
          <InputField icon={<CalendarDaysIcon className="w-5 h-5 text-indigo-500" />} label="Date of Birth" type="date" name="dob" value={editMode ? form.dob : admin.dob} onChange={handleChange} disabled={!editMode} />
          <InputField icon={<MapPinIcon className="w-5 h-5 text-indigo-500" />} label="Address" name="address" value={editMode ? form.address : admin.address} onChange={handleChange} disabled={!editMode} />
          <InputField icon={<BriefcaseIcon className="w-5 h-5 text-indigo-500" />} label="Department" name="department" value={editMode ? form.department : admin.department} onChange={handleChange} disabled={!editMode} />
          <InputField icon={<KeyIcon className="w-5 h-5 text-indigo-500" />} label="Password" type="password" name="password" value={editMode ? form.password : admin.password} onChange={handleChange} disabled={!editMode} />

          {editMode && (
            <div className="col-span-2">
              <label className="text-gray-600 flex items-center gap-2 mb-2">
                <PhotoIcon className="h-5 w-5 text-gray-400" /> Profile Image
              </label>
              <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-xl" />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {!editMode ? (
            <>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setEditMode(true)} className="bg-indigo-600 px-6 py-2 rounded-2xl text-white shadow-lg hover:bg-indigo-500 transition">
                Edit Profile
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded-2xl text-white shadow-lg hover:bg-red-500 transition">
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button whileHover={{ scale: 1.05 }} onClick={handleSave} className="bg-green-600 px-6 py-2 rounded-2xl text-white shadow-lg hover:bg-green-500 transition">
                Save Changes
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setEditMode(false)} className="bg-gray-400 px-6 py-2 rounded-2xl text-white shadow-lg hover:bg-gray-500 transition">
                Cancel
              </motion.button>
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
        <div className="absolute left-3 top-3">{icon}</div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-3 rounded-2xl border ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition`}
        />
      </div>
    </div>
  );
}
