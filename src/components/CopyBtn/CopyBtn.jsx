"use client"
import "./style.css";
import toast, { Toaster } from "react-hot-toast";
function CopyBtn({ email }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    toast.success("Copied to the clipboard!");
  };
  return <button onClick={handleCopy}><Toaster/> Copy</button>;
}

export default CopyBtn;
