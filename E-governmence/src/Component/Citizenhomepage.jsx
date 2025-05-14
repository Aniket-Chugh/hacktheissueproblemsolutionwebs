import React from 'react'
import Feed from './Feed'
import SideNav from './SideNav'
import { useAuth } from './Signuppage'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
const HomePage1 = () => {
    const {signedup} = useAuth();
  return (



       <div className="flex min-h-screen bg-gray-100">
{
        signedup ?  null : (<Navigate to={"/"} ></Navigate>)
    }
      <div className="w-64 bg-white p-4 border-r sticky top-0 h-screen">
       <SideNav></SideNav>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4">
        <Feed />
      </div>


    </div>
  )
}

export default HomePage1
