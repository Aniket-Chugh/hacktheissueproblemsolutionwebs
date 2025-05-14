import React from 'react';
import SideNav from './SideNav';
import { useAuth } from './Signuppage';
import { Navigate } from 'react-router-dom';

const Setting = () => {
  const { signedup, setsignedup } = useAuth();

  const handleLogout = () => {
    setsignedup(false);
  };

  if (!signedup) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNav />

      {/* Main Settings Content */}
      <div className="flex-1 p-10">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>

          <div className="flex flex-col gap-6">
            {/* Example Setting Item */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h4 className="font-medium text-gray-700">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive updates about your reports and comments.</p>
              </div>
              <button className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md">
                Manage
              </button>
            </div>

            {/* Another Setting or Future Slot */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h4 className="font-medium text-gray-700">Change Password</h4>
                <p className="text-sm text-gray-500">Update your account password.</p>
              </div>
              <button className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md">
                Change
              </button>
            </div>

            {/* Logout Button */}
            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-200 w-full"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
