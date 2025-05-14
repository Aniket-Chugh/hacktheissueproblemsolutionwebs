import React from 'react';
import {
  FaHome,
  FaEnvelope,
  FaUsers,
  FaPhotoVideo,
  FaCog,
  FaComments,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from './Signuppage';
import { FaPlus } from "react-icons/fa6";


const SideNav = () => {
const {username } = useAuth();
  return (
    <div className="sticky top-0 bg-white h-screen w-64 p-6  shadow-xl flex flex-col justify-between">
      {/* Top - Profile Info and Menu */}
      <div>
        {/* Profile */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-md"
          />
          <div className="text-center">
            <h2 className="text-lg font-bold">{username}</h2>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="flex flex-col gap-3  after:bg-blue-300">
             <Link to={"/report"}>
          <li className="bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3 font-semibold cursor-pointer">
           <FaPlus />
 Raise An Issue
          </li>
            </Link>
            <Link to={"/citizen"}>
          <li className="bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3 font-semibold cursor-pointer">
            <FaHome /> News Feed
          </li>
            </Link>
          <Link to={"/profileCitizen"}>
          <li className="hover:bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <FaEnvelope /> Profile

            </div>
          </li>
          </Link>
          <li className="hover:bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 text-gray-700 font-medium cursor-pointer">
            <FaComments /> Forums
          </li>
          <Link to={"/setting"}>
          <li className="hover:bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 text-gray-700 font-medium cursor-pointer">
            <FaCog /> Settings
          </li>
          </Link>
        </ul>
      </div>

      {/* Bottom - Download App */}
      <div className="bg-gradient-to-br from-purple-300 to-pink-300 p-4 rounded-xl flex items-center gap-3">
        <img
          src="https://img.icons8.com/fluency/48/hand-cursor.png"
          alt="App Icon"
          className="w-12 h-12 rounded-xl"
        />
        <div>
          <h4 className="text-sm font-bold text-white leading-tight">Download the App</h4>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
