import Link from "next/link";
import React from "react";
import { MdEditSquare } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import "./style.css"
function CustomLink({ row }) {
  return <div className="projectListCustomLink">
    <Link aria-label="Edit" href={`/dashboard/edit/${row}`} target="_blank"><MdEditSquare size={22} color="darkblue" /></Link>
    <Link aria-label="View" href={`/status?search=${row}`} rel="noopener noreferrer" target="_blank"><BsFillEyeFill size={22} color="darkblue" /></Link>
  </div>
}

export default CustomLink;
