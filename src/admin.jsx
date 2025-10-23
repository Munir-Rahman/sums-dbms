import React, { useState } from "react";
import Header from "./adminpage/Header";
import Sidebar from "./adminpage/Sidebar";
import Dashboard from "./adminpage/Dashboard";
import Admission from "./adminpage/Admission";
import Teachers from "./adminpage/Teacher";
import Students from './adminpage/Student'
import AppliedList from "./adminpage/ApplySuggestion";
import Feedback from "./adminpage/Feedback";
import BottomNav from "./adminpage/BottomNav";
import AdminSettings from "./adminpage/setting";
import Profile from "./adminpage/Profile";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "adminprofile":
        return <Profile/>
      case "dashboard":
        return <Dashboard />;
      case "admission":
        return <Admission />;
      case "teachers":
        return <Teachers />;
      case "students":
        return <Students />;
      case "feedback":
        return <Feedback />;
      case "apply":
        return <AppliedList />;
      case "settings":
        return <AdminSettings/>  
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-900 text-white">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>

      {/* BottomNav for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 w-full md:hidden bg-white border-t shadow-md">
        <BottomNav setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
    </div>
  );
}
 