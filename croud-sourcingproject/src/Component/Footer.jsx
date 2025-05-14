import React from 'react'

const Footer = () => {
  return (
    <div>
 <div className="bg-gray-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-sm">&copy; 2025 QuickSeva. All rights reserved.</p>
        <div className="mt-4">
          <a href="/about" className="text-white mx-4 hover:text-blue-400">About Us</a>
          <a href="/contact" className="text-white mx-4 hover:text-blue-400">Contact</a>
          <a href="/terms" className="text-white mx-4 hover:text-blue-400">Terms & Conditions</a>
          <a href="/privacy" className="text-white mx-4 hover:text-blue-400">Privacy Policy</a>
        </div>
                </div>
        </div>

    </div>
  )
}

export default Footer
