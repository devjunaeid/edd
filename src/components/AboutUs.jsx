import React from 'react'
import { PiCaretDoubleDownBold } from "react-icons/pi";

function AboutUs() {
  return (
    <div className='about_cont'>
      <h1>About Us</h1>
      <div className='qoute_cont'>
        <PiCaretDoubleDownBold size={96} className='qoute_icon' />
        <p className='qoute_text'>Welcome to <span
        >"Engineer's Design & Development"</span> – where creativity meets expertise! Since our inception in 2017, we've had the pleasure of serving over <span>500</span> clients nationwide. We're passionate about delivering top-notch civil, architectural, and electrical services tailored just for you. Join our family today and let's create something amazing together!</p>
      </div>
    </div>
  )
}

export default AboutUs
