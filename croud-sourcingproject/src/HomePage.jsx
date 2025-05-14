import React, { useState } from 'react'
import Navbar from './Component/NavBar'
import HeroSection from './Component/HeroSection'
import Feature from './Component/Features'
import CTASection from './Component/CTAsection'
import Footer from './Component/Footer'
import ChatBot from './Component/ChatBot'
import { useAuth } from './Component/Signuppage'
import { Navigate } from 'react-router-dom'
const HomePage = () => {
    const {signedup} = useAuth();
  return (
    <div >
        {signedup && <Navigate to={"/citizen"}/>}
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Feature></Feature>
      <CTASection></CTASection>
      <Footer></Footer>
      <ChatBot></ChatBot>
    </div>
  )
}

export default HomePage
