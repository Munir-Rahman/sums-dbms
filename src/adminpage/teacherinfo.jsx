import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PencilIcon, PrinterIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

export default function TeacherInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const profileRef = useRef(null);

  const [teacher, setTeacher] = useState({
    id: id,
    name: "Mrs. Fatima Noor",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "fatima.noor@university.edu",
    phone: "+93 700 123 456",
    gender: "Female",
    qualification: "MSc in Computer Science",
    experience: "5 Years",
    subjects: ["Web Development", "Database Systems"],
    assignedClasses: ["BSCS 1st Year", "BSIT 2nd Year"],
    address: "Kabul, Afghanistan",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Teacher details updated successfully!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setTeacher({ ...teacher, image: imageUrl });
  };

  const downloadPDF = () => {
    const input = profileRef.current;
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${teacher.name}_Profile.pdf`);
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">🧑‍🏫 Teacher Profile</h2>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => navigate("/admin")} text="← Back" bg="gray" />
          <Button onClick={downloadPDF} text="Download PDF" bg="green" icon={<PrinterIcon className="w-5 h-5" />} />
          <Button onClick={() => setIsEditing(!isEditing)} text={isEditing ? "Cancel Edit" : "Edit Info"} bg="indigo" icon={<PencilIcon className="w-5 h-5" />} />
        </div>
      </div>

      {/* Profile Card */}
      <motion.div
        ref={profileRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 border border-gray-100"
      >
        {/* Left: Image + QR */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative group">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-44 h-44 object-cover rounded-full shadow-lg border-4 border-indigo-200 transition-transform transform group-hover:scale-105"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs cursor-pointer hover:bg-indigo-500 transition">
                Change
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
          <h3 className="text-2xl font-semibold mt-4">{teacher.name}</h3>
          <p className="text-gray-600">{teacher.qualification}</p>

          <div className="mt-6 bg-gray-50 p-3 rounded-xl shadow-inner">
            <QRCodeCanvas value={`Teacher ID: ${teacher.id}\nName: ${teacher.name}`} size={120} bgColor="#ffffff" fgColor="#4f46e5" level="H" includeMargin />
            <p className="text-xs text-gray-500 mt-2 text-center">Scan for details</p>
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:w-2/3 space-y-6">
          {/* Personal Info */}
          <InfoSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Email" name="email" value={teacher.email} onChange={handleChange} editable={isEditing} />
              <InputField label="Phone" name="phone" value={teacher.phone} onChange={handleChange} editable={isEditing} />
              <InputField label="Gender" name="gender" value={teacher.gender} onChange={handleChange} editable={isEditing} />
              <InputField label="Address" name="address" value={teacher.address} onChange={handleChange} editable={isEditing} />
            </div>
          </InfoSection>

          {/* Academic Info */}
          <InfoSection title="Academic Information">
            <InputField label="Experience" name="experience" value={teacher.experience} onChange={handleChange} editable={isEditing} />
            <TagList label="Subjects" items={teacher.subjects} editable={isEditing} onChange={(subjects) => setTeacher({ ...teacher, subjects })} />
            <TagList label="Assigned Classes" items={teacher.assignedClasses} editable={isEditing} onChange={(assignedClasses) => setTeacher({ ...teacher, assignedClasses })} />
          </InfoSection>
        </div>
      </motion.div>

      {isEditing && (
        <div className="mt-6 text-right">
          <button onClick={handleSave} className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-500 transition font-semibold shadow-md">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

// Reusable Components

const Button = ({ onClick, text, bg, icon }) => {
  const colors = {
    gray: "bg-gray-600 hover:bg-gray-700",
    green: "bg-green-600 hover:bg-green-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
  };
  return (
    <button onClick={onClick} className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold transition ${colors[bg]}`}>
      {icon} {text}
    </button>
  );
};

const InfoSection = ({ title, children }) => (
  <section>
    <h4 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h4>
    <div className="space-y-3">{children}</div>
  </section>
);

const InputField = ({ label, name, value, onChange, editable }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    {editable ? (
      <input type="text" name={name} value={value} onChange={onChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition" />
    ) : (
      <p className="p-3 bg-gray-100 rounded-lg">{value}</p>
    )}
  </div>
);

const TagList = ({ label, items, editable, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleRemove = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {item} {editable && <button onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700">✕</button>}
          </span>
        ))}
      </div>
      {editable && (
        <div className="flex gap-2 mt-2">
          <input type="text" placeholder={`Add ${label.slice(0, -1)}...`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 transition" />
          <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-500 transition">Add</button>
        </div>
      )}
    </div>
  );
};
