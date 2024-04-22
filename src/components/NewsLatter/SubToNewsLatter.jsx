"use client"
import { useState } from "react"
import "./style.css"
import { emailValidation } from "@/utils/fromVlidation"

function SubToNewsLatter() {
 const [email, setEmail] = useState("") 
 const [error, setError] = useState("")

//  Handle Email Input
const handleInput = (e) => {
 setEmail(e.target.value)
 setError(emailValidation(e.target.value))
}

 const handleSubmit = (e) => {
  e.preventDefault()
  if (email == ""){
    setError("Please Enter Your Email")
  }else{
    console.log(email)
  }
 }
  return (
    <div className="sub-cont">
      <label htmlFor="email" className="input-label">Email</label>
     <div className="inputCont">
      <input type="email" id="email" name="email" placeholder="Subscibe to our newsletter" onChange={(e) => handleInput(e)} value={email}/>
      {error && <p className="errorMsg">{error}</p>}
      </div> 
      <button type="submit" className="submit-btn" onClick={handleSubmit} disabled={error != ""}>Submit</button>
    </div>
  )
}

export default SubToNewsLatter