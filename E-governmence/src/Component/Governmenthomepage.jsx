import React from 'react';
import { FaBullhorn, FaChartBar, FaCheckCircle, FaFileUpload, FaMapMarkerAlt, FaPaperPlane, FaStar, FaTag } from 'react-icons/fa';
import Navbar from './NavBar';
import Footer from './Footer';

export default function GovHomePage() {
    return (
        <div className="bg-gray-100 text-gray-800 font-sans">
            <Navbar />

            <header className="bg-blue-900 text-white py-6 shadow-md">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">Government Complaint Management Dashboard</h1>
                    <p className="mt-2 text-lg">Efficient | Transparent | Accountable</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-10">
                <section className="grid md:grid-cols-3 gap-6 mb-12">
                    <FeatureCard icon={<FaTag />} title="Auto-Priority Tagging" description="Complaints are automatically tagged based on urgency and impact using smart rules." />
                    <FeatureCard icon={<FaPaperPlane />} title="1-Click Assignment" description="Quickly assign complaints to the right ward officer or department." />
                    <FeatureCard icon={<FaCheckCircle />} title="Status Tracker" description="Track complaint progress in real-time with status updates and logs." />
                    <FeatureCard icon={<FaFileUpload />} title="Upload Proof of Resolution" description="Officials can upload photos or documents as proof of issue resolution." />
                    <FeatureCard icon={<FaBullhorn />} title="Voice & Text Posts" description="Broadcast messages and updates to citizens in multiple formats." />
                    <FeatureCard icon={<FaMapMarkerAlt />} title="Auto Notifications" description="Citizens receive alerts on complaint status and area-based updates." />
                    <FeatureCard icon={<FaChartBar />} title="Analytics Dashboard" description="Visual insights into complaint volume, resolution time, and department performance." />
                    <FeatureCard icon={<FaStar />} title="Public Trust Scores" description="Departments are rated based on performance and feedback to boost accountability." />
                    <FeatureCard icon={<FaTag />} title="Post Pinning" description="Pin important updates or notices to top for public visibility." />
                </section>

                <section className="bg-white p-6 rounded-xl shadow-md text-center">
                    <h2 className="text-2xl font-semibold mb-4">Empowering Governance</h2>
                    <p className="text-gray-600 mb-4">Our digital platform supports local governance in resolving public grievances faster and building public trust.</p>
                    <button className="mt-2 px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-700">View Dashboard</button>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
            <div className="text-blue-800 text-3xl mb-3">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
