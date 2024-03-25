"use client";
import { useState } from "react";
import st from "./page.module.css";
import { useRouter } from "next/navigation";
import ShortUniqueId from "short-unique-id";
import { setNewStatus } from "@/server/action";
import { useRecoilState } from "recoil";
import { projectList } from "@/lib/atoms/projectList";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const router = useRouter();

  //Recoil hook for all project data state.
  const [projects, setProjects] = useRecoilState(projectList);

  // state to handle create new project inputs.
  const [data, setData] = useState({
    client_name: "",
    project_name: "",
    phone: "",
    date: "",
    area: "",
    project_id: "",
  });

  // Unique ID config.
  const uid = new ShortUniqueId({ length: 4, dictionary: "alpha_upper" });
  
  //Handling Input Chnages.
  const handleChange = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };
    setData(updatedData);
  };

  //Handle New project Create request.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date(); // 2009-11-10
    const year = date.toLocaleString("default", { year: "2-digit" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const id = `${month}${year}-${uid.rnd()}`; //0324-ZPLN
    const res = await setNewStatus({ ...data, project_id: id });
    const result = JSON.parse(res);
    if (result.status != 500) {
      projects.length &&
        setProjects([...projects, { ...data, project_id: id }]);
      router.push(`/dashboard/edit/${id}`);
      toast.success("Added New Project!");
    } else {
      toast.error("Failed to Create New Project!");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={st.form}>
      <Toaster />
      <h1>Create new status</h1>
      <label htmlFor="project-name">Project Name</label>
      <input
        required={true}
        id="project-name"
        name="project_name"
        placeholder="Enter Project name"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="client-name">Client Name</label>
      <input
        required
        id="client-name"
        name="client_name"
        placeholder="Client name"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        required
        id="phone"
        name="phone"
        placeholder="Insert Client Phone Number."
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="date">Date</label>
      <input
        required
        id="date"
        name="date"
        placeholder="Insert Client Phone Number."
        type="date"
        onChange={handleChange}
        className="dateInput"
      />
      <label htmlFor="area">Area:</label>
      <input
        required
        id="area"
        name="area"
        placeholder="Project Area"
        type="text"
        onChange={handleChange}
      />

      <button type="submit" onClick={async (e) => await handleSubmit(e)}>
        Add
      </button>
    </form>
  );
}

export default page;
