// import React from 'react'
import Header from "./Header";
import Messages from "../components/Messages";
import Footer from "./Footer";

export default function Gemini() {
  return (
    <div className="w-auto h-[100svh]">
    
      {/* Header component */}
      <Header />
      
      {/* Messages component */}
      <Messages />
      
      {/* Footer component */}
      <Footer />
      
    </div>
  )
}