"use client";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import "./style.css";
import { emailValidation } from "@/utils/fromVlidation";
import { addSubscriber, isAlreadySubscribed } from "@/server/action";

function SubToNewsLatter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [togMsg, setTogMsg] = useState("");
  //  Handle Email Input
  const handleInput = (e) => {
    setEmail(e.target.value);
    console.log(email)
    setError(emailValidation(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "") {
      setError("Please Enter Your Email");
    } else {
      const res = await isAlreadySubscribed(email)
      if (res != null){
        setTogMsg("You are already registred!!")
      }else{
        const res = await addSubscriber(email)
        if(JSON.parse(res).status == 201){
          setTogMsg("Subscription successfull!!")
        }else{
          setTogMsg("Failed to subscribe! Contact help.")
        }
      } 
      setToggle(true);
    }
  };
  return (
    <div className="sub-cont">
      <label htmlFor="email" className="input-label">
        Email
      </label>
      <div className="inputCont">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Subscibe to our newsletter"
          onChange={(e) => handleInput(e)}
          value={email}
        />
        {error && <p className="errorMsg">{error}</p>}
      </div>
      <button
        type="submit"
        className="submit-btn"
        onClick={handleSubmit}
        disabled={error != ""}
      >
        Submit
      </button>
      {toggle && (
        <div className="togMsg">
          <h2>Thank You!!</h2>
          <p>{togMsg}</p>
          <button onClick={() => setToggle(false)} className="popupBtn">
            <IoCloseCircleSharp size={32} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SubToNewsLatter;
