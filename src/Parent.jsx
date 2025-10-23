import React, { useState } from "react";
import StHeader from "./studentpage/StHeader";
import StSidebar from "./studentpage/StSidebar";
import StDashboard from "./studentpage/StDashboard";
import StFeedback from "./studentpage/StFeedback";
import StBottomNav from "./studentpage/StBottomNav";
import StudentProfile from "./studentpage/StudentProfile";
import StAttendances from "./studentpage/StAttendances";
import StudentSettings from './studentpage/stSetting'

export default function Parent() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "stprofile":
        return <StudentProfile/>
      case "stdashboard":
        return <StDashboard />;
      case "stfeedback":
        return <StFeedback />; 
      case "stattendances":
        return <StAttendances />;   
      case "stsetting":
        return <StudentSettings/>    
      default:
        return <StDashboard />;
    }
  };
 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-900 text-white">
        <StSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <StHeader />
        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>

      {/* BottomNav for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-md">
        <StBottomNav setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
    </div>
  );
}
