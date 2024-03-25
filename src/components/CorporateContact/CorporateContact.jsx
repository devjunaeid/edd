"use client";
import { MdArrowOutward } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import "./style.css";
import { useState } from "react";

function CorporateContact() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="cont">
      <button onClick={() => setToggle(true)}>
        For Corporate Service Contact With Us
        <MdArrowOutward className="searchicon" />
      </button>
      {toggle && (
          <div className="togMsg">
            <h2>For Corporate Projects</h2>
            <p> <span>Phone: </span>+88 01923161166</p>
            <p><span>Email: </span>mdhozaifa212@gmail.com</p>
            <button onClick={() => setToggle(false)} className="popupBtn"><IoCloseCircleSharp size={32}/></button>
          </div>
        )}
    </div>
  );
}

export default CorporateContact;
