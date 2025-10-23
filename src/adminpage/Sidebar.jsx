import React from "react";
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  InboxIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: "adminprofile", label: "Profile", icon: <UserIcon className="w-5 h-5" />, path: "/adminprofile" },
    { id: "dashboard", label: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/admin" },
    { id: "admission", label: "Admission", icon: <AcademicCapIcon className="w-5 h-5" />, path: "/admission" },
    { id: "students", label: "Students", icon: <UserGroupIcon className="w-5 h-5" />, path: "/students" },
    { id: "teachers", label: "Teachers", icon: <UserIcon className="w-5 h-5" />, path: "/teachers" },
    { id: "apply", label: "Suggestions", icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />, path: "/apply" },
    { id: "feedback", label: "Feedback", icon: <InboxIcon className="w-5 h-5" />, path: "/feedback" },
    { id: "settings", label: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" />, path: "/settings" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="bg-gradient-to-b from-gray-900 to-indigo-950 text-white h-full w-64 flex flex-col shadow-2xl">
      {/* Profile Section */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Admin"
          className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-md"
        />
        <div>
          <h3 className="font-semibold text-white">Admin</h3>
          <p className="text-gray-400 text-sm">System Administrator</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col flex-1 mt-4 space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeTab === item.id
                ? "bg-indigo-600 text-white shadow-md translate-x-1"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all shadow-md"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
 