import React, { useState } from 'react';
import SideNav from './SideNav';

const ProfileCitizen = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [location, setLocation] = useState(null);

  const sendOtp = () => {
    if (aadhaar.length !== 12) {
      alert('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    setOtpSent(true);
    alert('OTP sent to registered mobile (mock)');
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      setIsVerified(true);
      fetchLocation();
    } else {
      alert('Invalid OTP');
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
        },
        () => {
          alert('Failed to get location');
        }
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Aadhaar Verification</h1>

        {!isVerified ? (
          <div className="bg-white p-4 shadow rounded max-w-md">
            <label className="block mb-2 font-semibold">Enter Aadhaar Number:</label>
            <input
              type="text"
              maxLength={12}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              placeholder="1234 5678 9012"
            />
            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send OTP
              </button>
            ) : (
              <>
                <label className="block mb-2 mt-4 font-semibold">Enter OTP:</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border rounded mb-3"
                  placeholder="123456"
                />
                <button
                  onClick={verifyOtp}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-green-100 p-4 rounded shadow max-w-md">
            <h2 className="text-green-700 font-semibold text-lg mb-2">✅ Verified with Aadhaar</h2>
            {location && (
              <p className="text-gray-700">
                Approximate Location: {location.lat}, {location.lon}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCitizen;
