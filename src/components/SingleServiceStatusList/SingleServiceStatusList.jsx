"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import "./style.css";
import { deleteService, updateServiceById } from "@/server/action";
import { useRecoilState } from "recoil";
import { serviceList } from "@/lib/atoms/serviceList";

function SingleServiceStatusList({ id }) {
  const [services, setServices] = useRecoilState(serviceList);
  const [step, setStep] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [running, setRunning] = useState(true);
  const [statusItem, setStatusItem] = useState([]);
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState(false);

  //Initialize state values from global state.
  useEffect(() => {
    const data = services.filter((item) => item.id == id);
    setData(data[0]);
    setStep(data[0].current_step);
    setComment(data[0].comment);
    setDate(data[0].date);
    setRunning(data[0].running);
    setStatusItem(data[0].steps);
  }, [services]);

  const handleDateChanges = (e, id) => {
    let tempList = [];
    statusItem.map((item) =>
      item.id == id
        ? tempList.push({ ...item, ["date"]: e.target.value })
        : tempList.push(item)
    );
    setStatusItem(tempList);
  };

  const handleDelete = async (id, project_id) => {
    const res = await deleteService(id, project_id);
    const result = JSON.parse(res);
    if (result.status != 500) {
      const servicearr = services.filter((item) => item.id != id);
      setServices(servicearr);
      toast.success("Deleted!");
    } else {
      toast.error("Faild To Delete!");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = {
      ...data,
      ["current_step"]: step,
      ["date"]: date,
      ["comment"]: comment,
      ["running"]: running,
      ["steps"]: statusItem,
    };
    try {
      await updateServiceById(req, data.id, data.project_id);
      toast.success("Saved!");
    } catch (error) {
      toast.error("Faild to Update Status!!");
    }
    const servicearr = [];
    services.map((item) =>
      item.id === data.id ? servicearr.push(req) : servicearr.push(item)
    );
    setServices(servicearr);
  };
  return (
    data && (
      <div className="singleServiceCont">
        <Toaster />
        <h2>{data.service_name}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="commentCont">
          <div>
            <div className="input_cont">
              <label htmlFor="step">Step:</label>
              <input
                type="number"
                min={0}
                value={step}
                onChange={(e) => setStep(e.target.value)}
                id="step_count"
              />
            </div>
            <div className="input_cont">
              <label htmlFor="Date">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input_cont">
              <label htmlFor="checkbox">Running:</label>
              <input
                type="checkbox"
                checked={running}
                onChange={() => setRunning((prev) => !prev)}
              />
            </div>
          </div>

          <label htmlFor="comment">Comment(300chars)</label>
          <textarea
            name="comment"
            cols={20}
            rows={5}
            value={comment}
            maxLength={300}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
        <div className="stepCont">
          <ul>
            {data &&
              data.steps.map((item, key) => (
                <li key={item.id}>
                  <div>
                    {key < step ? (
                      <FiCheck size={22} color="lightgreen" />
                    ) : key == step ? (
                      <FiActivity size={22} color="lightblue" />
                    ) : (
                      <FiAlertCircle size={22} color="orange" />
                    )}
                  </div>
                  <p>
                    {item.name}-
                    <input
                      type="date"
                      defaultValue={item.date}
                      onChange={(e) => handleDateChanges(e, item.id)}
                    />
                  </p>
                </li>
              ))}
          </ul>
        </div>
        <div className="btnGroup">
          <button onClick={(e) => handleSubmit(e)}>Save</button>
          <button
            onClick={() => setPopup(true)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
        {popup && (
          <div className="popup">
            <p>Are You sure?</p>
            <div>
              <button onClick={() => handleDelete(data.id, data.project_id)}>
              Delete
              </button>
              <button onClick={() => setPopup(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default SingleServiceStatusList;
