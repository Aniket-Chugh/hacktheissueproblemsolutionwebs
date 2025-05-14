import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import Footer from './Footer';
import { useAuth } from './Signuppage';
import { RiDeleteBin6Line } from "react-icons/ri";

const RecentReports = () => {
    const { signedup, setsignedup, username, setUserName, currentuser, setcurrentuser } = useAuth();
    const [reports, setReports] = useState(() => {
        const savedReports = localStorage.getItem('userReports');
        return savedReports ? JSON.parse(savedReports) : [];
    });

    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get("http://localhost:3001/submit-report");
                const allReports = res.data;

                const filteredReports = allReports.filter(
                    (report) => report.user_id === 5
                );

                if (filteredReports.length > 0) {
                    setReports(filteredReports);
                    localStorage.setItem('userReports', JSON.stringify(filteredReports));
                }
            } catch (err) {
                console.error("Error fetching reports:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [currentuser]);

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            await axios.post("http://localhost:3001/delete-report", {
                reportid: id
            });

            const updatedReports = reports.filter((r) => r.report_id !== id);
            setReports(updatedReports);
            localStorage.setItem('userReports', JSON.stringify(updatedReports)); // ✅ Correct key updated
        } catch (err) {
            console.error("Error deleting report:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('signedup');
        localStorage.removeItem('username');
        localStorage.removeItem('currentuser');
        setsignedup(false);
    };

    if (!signedup) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen flex flex-col">


            <div className=" bg-gray-50 font-sans">



                {/* Main Content */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <header className="mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Welcome, <span className="text-blue-600">{username}</span>
                        </h2>
                        <p className="text-gray-500">Here’s a summary of your recent reports.</p>
                    </header>

                    <section className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">📄 Recent Reports</h3>

                        {loading ? (
                            <p className="text-gray-500">Loading...</p>
                        ) : reports.length === 0 ? (
                            <p className="text-gray-500 italic">No reports submitted yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-1 sm:pr-2">
                                {reports.map((report, index) => (
                                    <div key={index} className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-gray-50 hover:bg-white shadow-sm transition duration-200">
                                        <h1 className='bold text-black font-3xl'>Uploaded Date : {report.uploaded_at}</h1>
                                        <h4 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 break-words">
                                            #{index + 1} - {report.title}
                                        </h4>
                                        <div className="text-gray-700 text-sm sm:text-base break-words overflow-hidden">
                                            ✏️ {report.description}
                                        </div>
                                        <button
                                            className="bg-red-500 mt-4 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2"
                                            onClick={() => {
                                                if (window.confirm("🗑️ Are you sure you want to delete this report?")) {
                                                    handleDelete(report.report_id);
                                                }
                                            }}
                                        >
                                            <RiDeleteBin6Line className="text-lg" />
                                            {deletingId === report.report_id ? "Deleting..." : "Delete Report"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default RecentReports;
