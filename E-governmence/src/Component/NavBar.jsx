import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiSearch } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "./Signuppage";

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef();
  const { signedup, setsignedup, username } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/">
            <h1 className="text-xl font-bold text-blue-700 tracking-tight">CitizenConnect</h1>
          </Link>
          <nav className="hidden md:flex gap-5 text-sm text-gray-700">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/support" className="hover:text-blue-600">Support</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/terms" className="hover:text-blue-600">Terms</Link>
          </nav>
        </div>

        <div className="hidden lg:flex items-center bg-gray-100 px-3 py-2 rounded-full">
          <input
            type="text"
            placeholder="Search help..."
            className="bg-transparent outline-none text-sm w-48 text-gray-700"
          />
          <Link to="/ngosearch" className="text-gray-600 hover:text-blue-600 ml-2">
            <FiSearch size={18} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {signedup ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                <BsPersonCircle size={22} />
                <span className="text-sm font-medium">{username}</span>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md overflow-hidden text-sm text-gray-800">
                  <Link to="/reports" className="block px-4 py-2 hover:bg-gray-100">My Reports</Link>
                  <Link to="/help" className="block px-4 py-2 hover:bg-gray-100">Help</Link>
                  <button
                    onClick={() => setsignedup(false)}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm">
                Sign Up
              </button>
            </Link>
          )}

          <button
            className="md:hidden text-gray-700"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            {showMobileNav ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {showMobileNav && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4">
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/support" className="hover:text-blue-600">Support</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/terms" className="hover:text-blue-600">Terms</Link>

            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-left w-full"
              >
                <span className="hover:text-blue-600">Volunteer Hub</span>
                <FiChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li className="hover:text-blue-600 cursor-pointer">Join Volunteer</li>
                  <li className="hover:text-blue-600 cursor-pointer">Task Manager</li>
                  <li className="hover:text-blue-600 cursor-pointer">Emergency Support</li>
                </ul>
              )}
            </div>

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full mt-3">
              <input
                type="text"
                placeholder="Search help..."
                className="bg-transparent outline-none text-sm w-full text-gray-700"
              />
              <Link to="/ngosearch" className="text-gray-600 hover:text-blue-600 ml-2">
                <FiSearch size={18} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
