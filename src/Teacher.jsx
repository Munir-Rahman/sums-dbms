import React, { useState } from "react";
import TcHeader from "./teacherpage/TcHeader";
import TcSidebar from "./teacherpage/TcSidebar";
import TcDashboard from "./teacherpage/TcDashboard";
import TcFeedback from "./teacherpage/TcFeedback";
import TcBottomNav from "./teacherpage/TcBottomNav";
import TeacherProfile from "./teacherpage/TeacherProfile";
import TeacherStudents from "./teacherpage/Allstudents";
import Addmarks from "./teacherpage/Addmarks";
import Attendances from "./teacherpage/Attendances";
import TakeAttendance from "./teacherpage/TakeAttendance";
import AttendanceReport from "./teacherpage/AttendanceReport";
import TeacherSettings from "./teacherpage/tcSetting";
export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "tcprofile":
        return <TeacherProfile/>
      case "tcdashboard":
        return <TcDashboard />;
      case "tcfeedback":
        return <TcFeedback />;
      case "allstudents":
        return <TeacherStudents />;  
      case "addmarks":
        return <Addmarks />;   
      case "attendances":
        return <Attendances />;     
      case "takeattendance":
        return <TakeAttendance />;    
      case "attendancereport":
        return <AttendanceReport/>  
      case "tcsystem":
        return <TeacherSettings/>
      default:
        return <TcDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-900 text-white">
        <TcSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TcHeader />
        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>

      {/* BottomNav for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-md">
        <TcBottomNav setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
    </div>
  );
}
