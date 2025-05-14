import React, { useState } from 'react';

const Feature = () => {
  const citizenFeatures = [
    "🔍 AI Issue Categorization",
    "🔼 Upvote Reports",
    "❌ Downvote / Flag Fake",
    "📍 Scan QR at Worksites",
    "💬 Reddit-style Threads",
    "🏆 Top Citizens, Testimonials",
    "🗳️ Election Time Tool",
    "🛑 Report Fake News",
    "🏘️ Local Discussion Rooms"
  ];

  const govtFeatures = [
    "⚙️ Auto-Priority Tagging",
    "📌 1-Click Assignment",
    "🟢 Complaint Status Tracker",
    "📸 Upload Proof of Resolution",
    "📣 Voice & Text Posts",
    "🔔 Auto Notifications",
    "📌 Post Pinning",
    "📊 Analytics Dashboard",
    "⭐ Public Trust Scores"
  ];

  const [view, setView] = useState("citizen");

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-600 min-h-screen w-full flex flex-col justify-center items-center relative px-4">
      <div className="text-center mb-12 max-w-2xl z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Report. Track. Resolve.
        </h1>
        <p className="text-slate-200 text-lg md:text-xl">
          Login to connect with your local corporator and raise your voice!
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("citizen")}
          className={`px-4 py-2 rounded-full border ${view === "citizen" ? "bg-indigo-600 text-white" : "bg-white text-black"}`}
        >
          Citizen View
        </button>
        <button
          onClick={() => setView("government")}
          className={`px-4 py-2 rounded-full border ${view === "government" ? "bg-green-600 text-white" : "bg-white text-black"}`}
        >
          Government View
        </button>
      </div>

      {/* Display Features Based on Selected View */}
      <div className="bg-white/10 p-6 rounded-xl shadow-xl space-y-3 text-black">
        {(view === "citizen" ? citizenFeatures : govtFeatures).map((feature, index) => (
          <div key={index} className="bg-white/20 p-3 rounded-lg">
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
