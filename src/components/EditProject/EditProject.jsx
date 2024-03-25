"use client";
import { useEffect, useState } from "react";
import { getAllStatus, updateStatusByID } from "@/server/action";
import { useRecoilState } from "recoil";
import { projectList } from "@/lib/atoms/projectList";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";

function EditProject({ id }) {
  const [single, setSingle] = useState({});
  const [projects, setProjects] = useRecoilState(projectList);
  

  // Initializing State Value.
  useEffect(() => {
    const getSingleProject = async () => {
      const data = await getAllStatus();
      setProjects(data);
      const filtered = data.filter((item) => item.project_id === id);
      setSingle(filtered[0]);
    };
    if (projects.length) {
      const data = projects.filter((item) => item.project_id === id);
      setSingle(data[0]);
    } else {
      getSingleProject();
    }
  }, []);

  const handleSave = async () => {
        try {
         await updateStatusByID(single, id);
         toast.success("Saved!");
        } catch (error) {
         toast.error("Faild to Save!");
        }
        let updateData = [];
    projects.filter((item) =>
      item.project_id != id ? updateData.push(item) : updateData.push(single),
    );
    setProjects(updateData);
  };

  const handleChangeIni = (e) => {
    const tempData = { ...single, [e.target.name]: e.target.value };
    setSingle(tempData);
  };

  return (
    single && (
      <div className="edit_cont">
        <Toaster />
        <div className="ini_info">
          <p className="pid">
            Project ID: <span>{single.project_id}</span>
          </p>
          <label htmlFor="client_name">Client: </label>
          <input
            type="text"
            name="client_name"
            defaultValue={single.client_name}
            onChange={(e) => handleChangeIni(e)}
            className="ini_input"
          />
          <label htmlFor="project_name">Project Name</label>
          <input
            type="text"
            name="project_name"
            defaultValue={single.project_name}
            onChange={(e) => handleChangeIni(e)}
            className="ini_input"
          />
          <label htmlFor="phone">Client Phone</label>
          <input
            type="text"
            maxLength={11}
            name="phone"
            defaultValue={single.phone}
            onChange={(e) => handleChangeIni(e)}
            className="ini_input"
          />
          <label htmlFor="area">Area</label>
          <input
            type="text"
            name="area"
            defaultValue={single.area}
            onChange={(e) => handleChangeIni(e)}
            className="ini_input"
          />
          <button className="saveBtn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    )
  );
}

export default EditProject;
