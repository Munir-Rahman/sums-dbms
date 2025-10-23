import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  BookOpen,
  Clock,
  MapPin,
  GraduationCap,
  FileText,
  ArrowLeft,
  User,
  Star,
} from "lucide-react";

export default function ApplyInfo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [applicants] = useState([
    {
      id: 1,
      name: "Munir Rahman",
      role: "Student",
      email: "munir.rahman@example.com",
      phone: "+93 700 123 456",
      class: "Grade 12 - Computer Science",
      shift: "Morning",
      address: "Kabul, Afghanistan",
      education: "High School Graduate - Kabul Model School",
      experience: "Applied for Computer Science program.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Ahmad Khan",
      role: "Student",
      email: "ahmad.khan@example.com",
      phone: "+93 701 111 222",
      class: "Grade 10 - Business Administration",
      shift: "Evening",
      address: "Herat, Afghanistan",
      education: "Business Foundation - Ariana Institute",
      experience: "Wants to join Business Administration class.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ]);

  const selected = applicants.find((p) => p.id === parseInt(id));

  if (!selected) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        No applicant found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/30"
      >
        {/* Header Image */}
        <div className="relative">
          <img
            src={selected.image}
            alt={selected.name}
            className="w-full h-72 object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute top-5 left-5">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-full shadow-md flex items-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>

          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-3xl font-semibold drop-shadow-md">
              {selected.name}
            </h1>
            <p className="text-gray-200">{selected.role}</p>
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-indigo-600 pl-3">
            Applicant Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5 text-gray-700">
            <InfoItem icon={<Mail />} label="Email" value={selected.email} color="text-indigo-600" />
            <InfoItem icon={<Phone />} label="Phone" value={selected.phone} color="text-green-600" />
            <InfoItem icon={<BookOpen />} label="Class" value={selected.class} color="text-blue-600" />
            <InfoItem icon={<Clock />} label="Shift" value={selected.shift} color="text-purple-600" />
            <InfoItem icon={<MapPin />} label="Address" value={selected.address} color="text-red-500" />
            <InfoItem icon={<GraduationCap />} label="Education" value={selected.education} color="text-yellow-600" />
          </div>

          {/* Experience Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-800">Experience / Note</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{selected.experience}</p>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 pt-4"
          >
            <button className="px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition">
              Approve Application
            </button>
            <button className="px-6 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition">
              Reject Application
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* InfoItem Component */
function InfoItem({ icon, label, value, color }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white/60 backdrop-blur-md rounded-xl p-3 shadow-sm hover:shadow-md transition">
      <div className={`flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
