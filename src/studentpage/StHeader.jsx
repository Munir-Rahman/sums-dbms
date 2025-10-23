import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function TcHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef();
  const profileRef = useRef();

  const notifications = [
    "📘 New student enrolled in Mathematics",
    "📩 You received new feedback from admin",
    "⚙️ System maintenance completed successfully",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (notifRef.current && notifRef.current.contains(event.target)) ||
        (profileRef.current && profileRef.current.contains(event.target))
      )
        return;
      setShowNotifications(false);
      setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 shadow-lg px-6 py-2 sticky top-0 z-50 backdrop-blur-lg border-b border-indigo-500/30">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg"
      >
        🎓 Welcome, <span className="text-yellow-300">Teacher</span>
      </motion.h1>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Section */}
        <div className="relative" ref={notifRef}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative cursor-pointer"
          >
            <BellIcon className="w-6 h-6 text-white drop-shadow-md hover:text-yellow-300 transition" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] flex justify-center items-center rounded-full text-white animate-pulse">
              {notifications.length}
            </span>
          </motion.div>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
              >
                <div className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">
                  Notifications
                </div>
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.map((note, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer text-sm"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="text-center text-sm text-gray-600 py-2 border-t hover:bg-gray-50 cursor-pointer">
                  View All
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Section */}
        <div className="relative" ref={profileRef}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Teacher"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <span className="text-white font-medium hidden md:block">
              Munir Rahman
            </span>
            <ChevronDownIcon className="w-4 h-4 text-gray-200 hidden md:block" />
          </motion.div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
              >
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    View Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
