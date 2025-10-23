import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import Teacher from "./teacher";
import Student from "./student";
import Parent from "./parent";
import StudentInfo from "./adminpage/studentinfo";
import TeacherInfo from "./adminpage/teacherinfo";
import ApplyInfo from "./adminpage/Applyinfo";
import Profile  from './adminpage/Profile.jsx'
import TakeAttendance from './teacherpage/TakeAttendance.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Admin Profile */}
        <Route path="/admin/adminprofile" element={<Profile/>}></Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/attendance/:attendanceId" element={<TakeAttendance />} />
        {/* Student Info Route */}
        <Route path="/admin/student/:id" element={<StudentInfo />} />
        {/* Teacher Info Route */}
        <Route path="/admin/teacher/:id" element={<TeacherInfo />} />
        {/* Apply Info Route */}
        <Route path="/admin/applyinfo/:id" element={<ApplyInfo />} />
        
        {/* Default redirect to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
