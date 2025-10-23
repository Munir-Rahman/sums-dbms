import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ArrowDownTrayIcon,
  AcademicCapIcon,
  PhoneIcon,
  MapPinIcon,
  QrCodeIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function StudentInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState();
  const [updated, setUpdated] = useState();

  useEffect(() => {
    const demoStudents = [
      {
        id: "1",
        name: "Ahmad Khan",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        subjectFocus: "Computer Science",
        email: "ahmad.khan@example.com",
        phone: "+93 700 123 456",
        address: "Kabul, Afghanistan",
        attendance: 92,
        subjects: [
          { subject: "Web Development", marks: 95 },
          { subject: "Python Programming", marks: 89 },
          { subject: "Mathematics", marks: 87 },
          { subject: "AI Fundamentals", marks: 92 },
        ],
        monthlyAttendance: [
          { month: "Jan", attendance: 90 },
          { month: "Feb", attendance: 88 },
          { month: "Mar", attendance: 94 },
          { month: "Apr", attendance: 96 },
        ],
      },
      {
        id: "2",
        name: "Munir Khan",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        subjectFocus: "Computer Science",
        email: "ahmad.khan@example.com",
        phone: "+93 700 123 456",
        address: "Kabul, Afghanistan",
        attendance: 92,
        subjects: [
          { subject: "Web Development", marks: 95 },
          { subject: "Python Programming", marks: 89 },
          { subject: "Mathematics", marks: 87 },
          { subject: "AI Fundamentals", marks: 92 },
        ],
        monthlyAttendance: [
          { month: "Jan", attendance: 90 },
          { month: "Feb", attendance: 88 },
          { month: "Mar", attendance: 94 },
          { month: "Apr", attendance: 96 },
        ],
      },
      {
        id: "3",
        name: "Mahmood Khan",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        subjectFocus: "Computer Science",
        email: "ahmad.khan@example.com",
        phone: "+93 700 123 456",
        address: "Kabul, Afghanistan",
        attendance: 92,
        subjects: [
          { subject: "Web Development", marks: 95 },
          { subject: "Python Programming", marks: 89 },
          { subject: "Mathematics", marks: 87 },
          { subject: "AI Fundamentals", marks: 92 },
        ],
        monthlyAttendance: [
          { month: "Jan", attendance: 90 },
          { month: "Feb", attendance: 88 },
          { month: "Mar", attendance: 94 },
          { month: "Apr", attendance: 96 },
        ],
      },
    ];
    const found = demoStudents.find((s) => s.id === id);
    setStudent(found);
    setUpdated(found);
  }, [id]);

  useEffect(() => {
    if (student) setUpdated(student);
  }, [student]);

  if (!student)
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        ⚠️ Student not found!
      </div>
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setUpdated({ ...updated, image: imageUrl });
  };

  const handleChange = (e) => {
    setUpdated({ ...updated, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setStudent(updated);
    setIsEditing(false);
    alert(" Student info updated successfully!");
  };

  const totalMarks = student.subjects.reduce((acc, s) => acc + s.marks, 0);
  const percentage = totalMarks / student.subjects.length;
  const grade =
    percentage >= 90
      ? "A+"
      : percentage >= 80
      ? "A"
      : percentage >= 70
      ? "B"
      : percentage >= 60
      ? "C"
      : "F";

  const downloadPDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${student.name}_Report.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AcademicCapIcon className="text-blue-700 w-10 h-10" />
          <h2 className="text-3xl font-bold text-blue-700 drop-shadow-sm">
            Student Profile
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            ← Back
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 flex items-center gap-2 transition"
          >
            <ArrowDownTrayIcon className="w-5 h-5" /> Download PDF
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 transition ${
              isEditing
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {isEditing ? (
              <>
                <CheckIcon className="w-5 h-5" /> Save
              </>
            ) : (
              <>
                <PencilIcon className="w-5 h-5" /> Edit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div
        ref={pdfRef}
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-blue-100"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-6">
          <div className="relative">
            <img
              src={updated.image}
              alt={student.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs cursor-pointer">
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {updated.name}
            </h3>
            <p className="text-gray-600 mt-1">
              Subject Focus:{" "}
              <span className="text-blue-700 font-semibold">
                {updated.subjectFocus}
              </span>
            </p>
            <p className="text-gray-500 mt-1">📧 {student.email}</p>
            <p className="text-gray-500 flex items-center">
              <PhoneIcon className="w-4 h-4 mr-1 text-blue-600" />
              {student.phone}
            </p>
            <p className="text-gray-500 flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1 text-blue-600" />
              {student.address}
            </p>
          </div>

          <div className="ml-auto flex flex-col items-center">
            <QRCodeCanvas
              value={`ID: ${student.id}, Name: ${student.name}`}
              size={100}
            />
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <QrCodeIcon className="w-4 h-4" /> Student QR
            </p>
          </div>
        </div>

        {/* Grade Table */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-1">
            <BookOpenIcon className="w-5 h-5" /> Subject Grades
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {student.subjects.map((s, i) => (
              <div
                key={i}
                className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h4 className="font-semibold text-gray-800">{s.subject}</h4>
                <p className="text-gray-600 mt-1">Marks: {s.marks}%</p>
                <p
                  className={`font-bold ${
                    s.marks >= 90
                      ? "text-green-700"
                      : s.marks >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Grade:{" "}
                  {s.marks >= 90
                    ? "A+"
                    : s.marks >= 80
                    ? "A"
                    : s.marks >= 70
                    ? "B"
                    : s.marks >= 60
                    ? "C"
                    : "F"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ChartCard title="📊 Attendance Overview">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={student.monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🏆 Subject Performance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={student.subjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="marks" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {isEditing && (
        <div className="text-right mt-8">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-500 transition shadow-md font-semibold"
          >
            Save Changes
          </button>
        </div>
      )}
    </motion.div>
  );
}

const ChartCard = ({ title, children }) => (
  <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md border border-gray-100">
    <h4 className="text-lg font-semibold text-gray-700 mb-3">{title}</h4>
    {children}
  </div>
);
