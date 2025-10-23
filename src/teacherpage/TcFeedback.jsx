import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";

export default function TcFeedback() {
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([
    { message: "Need more whiteboard markers.", date: "2025-10-10" },
    { message: "Internet connection was slow last week.", date: "2025-10-05" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() === "") return alert("Please write feedback first!");
    const newFeedback = {
      message,
      date: new Date().toLocaleDateString(),
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    setMessage("");
  };

  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <MessageSquare className="w-7 h-7 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">Teacher Feedback</h1>
      </div>

      {/* Feedback Form */}
      <form
        onSubmit={handleSend}
        className="bg-white p-6 rounded-2xl shadow-md mb-8"
      >
        <label className="block text-gray-700 font-semibold mb-2">
          Write your feedback:
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none"
          rows="5"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Feedback
        </button>
      </form>

      {/* Previous Feedbacks */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Your Previous Feedbacks
      </h2>

      <div className="space-y-4">
        {feedbacks.map((f, i) => (
          <motion.div
            key={i}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-700">{f.message}</p>
            <p className="text-sm text-gray-500 mt-2">Sent on {f.date}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
