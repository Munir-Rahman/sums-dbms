import React from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

export default function AdminBottomNav({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "admission", label: "Admissions", icon: AcademicCapIcon },
    { id: "teachers", label: "Teachers", icon: UserIcon },
    { id: "students", label: "Students", icon: UserGroupIcon },
    { id: "feedback", label: "Feedback", icon: InboxIcon },
    { id: "suggestion", label: "Suggestion", icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
      bg-gradient-to-r from-indigo-900/70 via-purple-800/60 to-blue-900/70 
      backdrop-blur-2xl border border-white/20 
      shadow-[0_0_25px_rgba(99,102,241,0.6)] rounded-3xl 
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
            className={`relative flex flex-col items-center justify-center transition-all duration-300`}
          >
            {/* Glow ring when active */}
            {isActive && (
              <motion.span
                layoutId="activeGlow"
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-yellow-400/30 via-pink-400/20 to-blue-400/30 blur-xl"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              ></motion.span>
            )}

            <Icon
              className={`h-7 w-7 z-10 transition-all duration-300 ${
                isActive
                  ? "text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.9)] scale-110"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />

            <span
              className={`text-[10px] font-medium mt-1 z-10 ${
                isActive ? "text-yellow-300" : "text-gray-300"
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
