import React from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  AcademicCapIcon,
  UserIcon,
  BookOpenIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Sparkles } from "lucide-react";

export default function StBottomNav({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "stdashboard", label: "Dashboard", icon: HomeIcon },
    { id: "stattendance", label: "Attendance", icon: BookOpenIcon },
    { id: "stfeedback", label: "Feedback", icon: InboxIcon },
    { id: "stprofile", label: "Profile", icon: UserIcon },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
      bg-gradient-to-r from-blue-800/80 via-indigo-700/70 to-purple-700/80 
      backdrop-blur-2xl border border-white/20 
      shadow-[0_0_25px_rgba(59,130,246,0.6)] rounded-3xl 
      px-5 py-3 flex justify-around items-center w-[92%] sm:w-[80%] md:w-[70%]"
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex flex-col items-center justify-center transition-all duration-300"
          >
            {/* Glowing aura when active */}
            {isActive && (
              <motion.span
                layoutId="studentGlow"
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-400/30 via-blue-400/30 to-cyan-400/30 blur-xl"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              ></motion.span>
            )}

            <Icon
              className={`h-7 w-7 z-10 transition-all duration-300 ${
                isActive
                  ? "text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)] scale-110"
                  : "text-gray-300 hover:text-sky-200"
              }`}
            />

            <span
              className={`text-[10px] font-medium mt-1 z-10 ${
                isActive ? "text-sky-300" : "text-gray-300"
              }`}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
