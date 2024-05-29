"use client";

import { setNewService } from "@/server/action";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { serviceList } from "@/lib/atoms/serviceList";
import toast from "react-hot-toast";
import "./style.css";
import ShortUniqueId from "short-unique-id";

const servicelist = [
  {
    service_name: "Approval Plan",
    steps: [
      {
        id: 1,
        name: "Plan Submit",
        date: "",
      },
      {
        id: 2,
        name: "Site Servey",
        date: "",
      },
      {
        id: 3,
        name: "Land Clearance",
        date: "",
      },
      {
        id: 4,
        name: "Received Land Clearance",
        date: "",
      },
      {
        id: 5,
        name: "Approval Sheet Drawing",
        date: "",
      },
      {
        id: 6,
        name: "Submit Approval Sheet",
        date: "",
      },
      {
        id: 7,
        name: "Approval Complete",
        date: "",
      },
      {
        id: 8,
        name: "Received Approval",
        date: "",
      },
    ],
  },
  {
    service_name: "Estimation/BOQ",
    steps: [
      {
        id: 1,
        name: "Project Measurement",
        date: "",
      },
      {
        id: 2,
        name: "Calculation(Foundation/Typical & Ground Floor)",
        date: "",
      },
      {
        id: 3,
        name: "Complie Estimation/BOQ",
        date: "",
      },
      {
        id: 4,
        name: "Completing Est. Report and Review",
        date: "",
      },
      {
        id: 5,
        name: "Handover Estimation Report",
        date: "",
      },
    ],
  },
  {
    service_name: "Architectural Design",
    steps: [
      {
        id: 1,
        name: "Concept Design",
        date: "",
      },
      {
        id: 2,
        name: "Planning",
        date: "",
      },
      {
        id: 3,
        name: "Review and Finallize Plan",
        date: "",
      },
      {
        id: 4,
        name: "Detailed Constraction Drawing",
        date: "",
      },
      {
        id: 5,
        name: "Design Handover",
        date: "",
      },
    ],
  },
  {
    service_name: "Soil Investigation",
    steps: [
      {
        id: 1,
        name: "Soil Sample Collection",
        date: "",
      },
      {
        id: 2,
        name: "Send Sample for Lab test",
        date: "",
      },
      {
        id: 3,
        name: "Get Test Result",
        date: "",
      },
      {
        id: 4,
        name: "Check and Prepare Report",
        date: "",
      },
      {
        id: 5,
        name: "Report Dalivary",
        date: "",
      },
    ],
  },
  {
    service_name: "Land Servey",
    steps: [
      {
        id: 1,
        name: "Land Measurement",
        date: "",
      },
      {
        id: 2,
        name: "Ready Servey Report",
        date: "",
      },
      {
        id: 3,
        name: "Check and Review Report",
        date: "",
      },
      {
        id: 4,
        name: "Servey Report Dalivary",
        date: "",
      },
    ],
  },
  {
    service_name: "Structural Design Software",
    steps: [
      {
        id: 1,
        name: "Setup Structure for plan",
        date: "",
      },
      {
        id: 2,
        name: "Load Calculation",
        date: "",
      },
      {
        id: 3,
        name: "E-tabs Design",
        date: "",
      },
      {
        id: 4,
        name: "Menual Design Check",
        date: "",
      },
      {
        id: 5,
        name: "Fire Safety Check",
        date: "",
      },
      {
        id: 6,
        name: "Earthquake Check",
        date: "",
      },
      {
        id: 7,
        name: "Design Check for BNBC",
        date: "",
      },
      {
        id: 8,
        name: "Approve Design",
        date: "",
      },
      {
        id: 9,
        name: "Structure Drawing",
        date: "",
      },
      {
        id: 10,
        name: "Complete Structure Design Report",
        date: "",
      },
    ],
  },
  {
    service_name: "Structural Design Menual",
    steps: [
      {
        id: 1,
        name: "Setup Structure for plan",
        date: "",
      },
      {
        id: 2,
        name: "Load Calculation",
        date: "",
      },
      {
        id: 3,
        name: "Menual Design",
        date: "",
      },
      {
        id: 4,
        name: "Design Check for BNBC",
        date: "",
      },
      {
        id: 5,
        name: "Approve Design",
        date: "",
      },
      {
        id: 6,
        name: "Structure Drawing",
        date: "",
      },
      {
        id: 7,
        name: "Complete Structural Design Report",
        date: "",
      },
    ],
  },
  {
    service_name: "Steel Structure Design and Drawing",
    steps: [
      {
        id: 1,
        name: "Setup Structure for plan",
        date: "",
      },
      {
        id: 2,
        name: "Load Calculation",
        date: "",
      },
      {
        id: 3,
        name: "Tekla Design",
        date: "",
      },
      {
        id: 4,
        name: "Menual Design Check",
        date: "",
      },
      {
        id: 5,
        name: "Fire Safety Check",
        date: "",
      },
      {
        id: 6,
        name: "Earthquake Check",
        date: "",
      },
      {
        id: 7,
        name: "Design Check for BNBC",
        date: "",
      },
      {
        id: 8,
        name: "Approve Design",
        date: "",
      },
      {
        id: 9,
        name: "Structure Drawing",
        date: "",
      },
      {
        id: 10,
        name: "Complete Structure Design Report",
        date: "",
      },
    ],
  },
  {
    service_name: "Interior & Exterior Design",
    steps: [
      {
        id: 1,
        name: "Planning and Implementing Design",
        date: "",
      },
    ],
  },
  {
    service_name: "Electrial & Plambing Design",
    steps: [
      {
        id: 1,
        name: "Planning and Implementing Design",
        date: "",
      },
    ],
  },
  {
    service_name: "Industrial Attachment",
    steps: [
      {
        id: 1,
        name: "Enrollment",
        date: "",
      },
      {
        id: 2,
        name: "Project 1",
        date: "",
      },
      {
        id: 3,
        name: "Project 2",
        date: "",
      },
      {
        id: 4,
        name: "Project 3",
        date: "",
      },
      {
        id: 5,
        name: "Evaluation Exam",
        date: "",
      },
      {
        id: 6,
        name: "Result",
        date: "",
      },
      {
        id: 7,
        name: "Certifiaction",
        date: "",
      },
    ],
  },
];
function AddNewService({ id }) {
  const [service, setService] = useState({
    id: "",
    project_id: id,
    service_name: "",
    date: "",
    steps: null,
    running: true,
    current_step: 0,
  });

  const [services, setServices] = useRecoilState(serviceList);
  const uid = new ShortUniqueId({ length: 12 });

  const handleChange = (e) => {
    const serviceid = uid.rnd();
    servicelist.map(
      (item) =>
        item.service_name == e.target.value &&
        setService({
          ...service,
          ["service_name"]: item.service_name,
          ["steps"]: item.steps,
          ["id"]: serviceid,
        })
    );
  };

  const handleOtherInputs = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  //Add new service.
  const handleSubmit = async () => {
    const res = await setNewService(service, id);
    const result = JSON.parse(res);
    if (result.status != 500) {
      setServices([service, ...services]);
      toast.success("Service Added!");
    } else {
      toast.error("Faild to Add!");
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="addNewServiceCont">
      <div>
        <label htmlFor="select-service">Select Service</label>
        <select
          title="Slect a service"
          name="service"
          onChange={(e) => handleChange(e)}
        >
          <option disabled selected value={""}>
            Select a Service
          </option>
          {servicelist.map((item, key) => (
            <option key={key} value={item.service_name}>
              {item.service_name}
            </option>
          ))}
        </select>
        <label htmlFor="date">Date</label>
        <input name="date" type="date" onChange={(e) => handleOtherInputs(e)} />
      </div>
      <button
        disabled={service.date.length == 0 || service.service_name.length == 0}
        type="submit"
        onClick={handleSubmit}
      >
        Add
      </button>
    </form>
  );
}

export default AddNewService;
