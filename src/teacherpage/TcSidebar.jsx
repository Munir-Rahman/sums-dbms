import React from "react";
import {
  HomeIcon,
  AcademicCapIcon,
  UserIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TcSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: "tcprofile", label: "Profile", icon: <UserIcon className="w-5 h-5" />, path: "/tcprofile" },
    { id: "tcdashboard", label: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/tcdashboard" },
    { id: "allstudents", label: "Students", icon: <AcademicCapIcon className="w-5 h-5" />, path: "/allstudents" },
    { id: "subjects", label: "Subjects", icon: <BookOpenIcon className="w-5 h-5" />, path: "/subjects" },
    { id: "attendances", label: "Attendance", icon: <ChartBarIcon className="w-5 h-5" />, path: "/attendances" },
    { id: "tcfeedback", label: "Feedback", icon: <MessageSquare className="w-5 h-5" />, path: "/tcfeedback" },
    { id: "tcsystem", label: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" />, path: "/tcsystem" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="bg-gradient-to-b from-gray-900 to-indigo-950 text-white h-full w-64 flex flex-col shadow-xl">
      {/* Profile Section */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <img
          src="https://randomuser.me/api/portraits/men/13.jpg"
          alt="Teacher"
          className="w-10 h-10 rounded-full border-2 border-indigo-500"
        />
        <div>
          <h3 className="font-semibold text-white">Mr. Ahmed Khan</h3>
          <p className="text-gray-400 text-sm">Physics Teacher</p>
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
            onClick={() => {
              setActiveTab(item.id);
            }}
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
          className="flex items-center gap-3 w-full px-3 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
