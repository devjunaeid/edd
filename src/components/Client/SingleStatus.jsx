"use client";
import { useState } from "react";
import { convertDate } from "@/utils/misc";
import { FiAlertCircle } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import "./style.css";

function SingleStatus({ data }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="single_cont">
      <h2 className="header">{data.service_name}</h2>
      <div className="gen_info">
        <p>
          Date: <span>{convertDate(data.date)}</span>
        </p>
        <p className="comment">{data.comment}</p>
        <p>
          Status: <span>{data.running ? "Running" : "Completed"}</span>
        </p>
        <button onClick={() => setToggle(true)} className="openPopUp">
          View Status
        </button>
      </div>
      {toggle && (
        <div className="popUp_cont">
          <p>{data.service_name}</p>
          <ul>
            {data &&
              data.steps.map((item) => (
                <li key={item.id}>
                  <div>
                    {item.id < data.current_step + 1 ? (
                      <FiCheck size={32} color="lightgreen" className="icons"/>
                    ) : item.id == data.current_step + 1 ? (
                      <FiActivity size={32} color="#5356FF" className="icons"/>
                    ) : (
                      <FiAlertCircle size={32} color="orange" className="icons"/>
                    )}
                  </div>
                  <div className="single_info">
                    <p>{item.name}</p>
                    <p className="date">
                      {item.date ? convertDate(item.date) : "No date"}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
          <button onClick={() => setToggle(false)} className="popup_btn">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default SingleStatus;
