import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  KeyIcon,
  PhotoIcon,
  AcademicCapIcon,
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function Admission() {
  const [form, setForm] = useState({
    fullname: "",
    fathername: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    parentPhone: "",
    parentEmail: "",
    birthplace: "",
    class: "",
    shift: "",
    tazkira: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    subject: "", // for teachers
  });

  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("STUDENT"); // default

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.fullname) newErrors.fullname = "Full Name is required";
    if (!form.gender) newErrors.gender = "Select a gender";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";
    if (!form.phone.match(/^[0-9]{9,15}$/))
      newErrors.phone = "Enter a valid phone number";
    if (!form.tazkira) newErrors.tazkira = "Tazkira / Passport required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.profileImage) newErrors.profileImage = "Profile image is required";

    if (role === "STUDENT") {
      if (!form.fathername) newErrors.fathername = "Father Name is required";
      if (!form.parentPhone.match(/^[0-9]{9,15}$/))
        newErrors.parentPhone = "Enter a valid parent phone number";
      if (!form.parentEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        newErrors.parentEmail = "Invalid parent email address";
      if (!form.birthplace) newErrors.birthplace = "Place of birth required";
      if (!form.class) newErrors.class = "Select a class";
      if (!form.shift) newErrors.shift = "Select a shift";
    }

    if (role === "TEACHER") {
      if (!form.class) newErrors.class = "Class is required";
      if (!form.subject) newErrors.subject = "Subject is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert(`✅ ${role} Admission form submitted successfully!`);
      console.log("Form Data:", { ...form, role });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex justify-center items-start pt-16 pb-20 px-4"
    >
      <motion.div
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-4xl p-10 border border-gray-100"
      >
        {/* Role Toggle */}
        <div className="flex justify-center gap-6 mb-8">
          <RoleButton active={role === "STUDENT"} onClick={() => setRole("STUDENT")} text="Add Student" color="blue" />
          <RoleButton active={role === "TEACHER"} onClick={() => setRole("TEACHER")} text="Add Teacher" color="green" />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          {role === "STUDENT" ? "Student Admission Form" : "Teacher Admission Form"}
        </motion.h2>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <InputField icon={<UserIcon />} placeholder="Full Name" name="fullname" value={form.fullname} onChange={handleChange} error={errors.fullname} />

          {role === "STUDENT" && (
            <InputField icon={<UserIcon />} placeholder="Father Name" name="fathername" value={form.fathername} onChange={handleChange} error={errors.fathername} />
          )}

          <SelectField icon={<UserIcon />} label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female"]} error={errors.gender} />

          <InputField icon={<CalendarDaysIcon />} type="date" placeholder="Date of Birth" name="dob" value={form.dob} onChange={handleChange} error={errors.dob} />

          <InputField icon={<EnvelopeIcon />} type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
          <InputField icon={<PhoneIcon />} placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />

          {role === "STUDENT" && (
            <>
              <InputField icon={<PhoneIcon />} placeholder="Parent Phone" name="parentPhone" value={form.parentPhone} onChange={handleChange} error={errors.parentPhone} />
              <InputField icon={<EnvelopeIcon />} type="email" placeholder="Parent Email" name="parentEmail" value={form.parentEmail} onChange={handleChange} error={errors.parentEmail} />
              <InputField icon={<MapPinIcon />} placeholder="Place of Birth" name="birthplace" value={form.birthplace} onChange={handleChange} error={errors.birthplace} />
              <SelectField icon={<AcademicCapIcon />} label="Subject" name="Subject" value={form.class} onChange={handleChange} options={["Math","Pashto","Dari","Physics","Chemistry"]} error={errors.class} />
              <SelectField icon={<ClockIcon />} label="Shift Time" name="shift" value={form.shift} onChange={handleChange} options={["Morning","Afternoon","Evening"]} error={errors.shift} />
            </>
          )}

          {role === "TEACHER" && (
            <>
              <InputField icon={<BriefcaseIcon />} placeholder="Class" name="class" value={form.class} onChange={handleChange} error={errors.class} />
              <InputField icon={<BriefcaseIcon />} placeholder="Subject Specialization" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
            </>
          )}

          <InputField icon={<IdentificationIcon />} placeholder="Tazkira / Passport Number" name="tazkira" value={form.tazkira} onChange={handleChange} error={errors.tazkira} />

          <InputField icon={<KeyIcon />} type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} error={errors.password} />
          <InputField icon={<KeyIcon />} type="password" placeholder="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          {/* Profile Image */}
          <motion.div className="md:col-span-2">
            <label className="text-gray-600 mb-1">Profile Image</label>
            <div className="flex items-center gap-3 border rounded-xl px-3 py-2 hover:shadow-md transition">
              <PhotoIcon className="h-5 w-5 text-gray-400" />
              <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="text-sm" />
            </div>
            {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>}
          </motion.div>

          {/* Submit */}
          <motion.div className="md:col-span-2">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition duration-300">
              Submit Application
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* Components */
const InputField = ({ icon, type = "text", placeholder, name, value, onChange, error }) => (
  <motion.div className="relative">
    <div className="absolute left-3 top-3 text-gray-400 h-5 w-5">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400"
      } focus:ring-2 transition-all duration-300`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </motion.div>
);

const SelectField = ({ icon, options, label, name, value, onChange, error }) => (
  <motion.div className="relative">
    <div className="absolute left-3 top-3 text-gray-400 h-5 w-5">{icon}</div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
        error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:border-green-500 focus:ring-green-400"
      } focus:ring-2 transition-all duration-300`}
    >
      <option value="">{label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </motion.div>
);

const RoleButton = ({ active, onClick, text, color }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-xl font-semibold shadow-md transition ${
      active ? `bg-${color}-600 text-white` : `bg-gray-200 text-gray-700 hover:bg-gray-300`
    }`}
  >
    {text}
  </button>
);
