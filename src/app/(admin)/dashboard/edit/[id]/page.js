"use client";
import { getServices } from "@/server/action";
import { useEffect } from "react";
import st from "./page.module.css";
import AddNewService from "@/components/AddNewService/AddNewService";
import SingleServiceStatusList from "@/components/SingleServiceStatusList/SingleServiceStatusList";
import EditProject from "@/components/EditProject/EditProject";
import { useRecoilState } from "recoil";
import { serviceList } from "@/lib/atoms/serviceList";

export default function Page({ params }) {

  //Initializing @Recoil state hook.
  const [statusList, setStatusList] = useRecoilState(serviceList);
  const { id } = params;


  //set state value on load.
  useEffect(() => {

    /**
     * Get all services based on given ID.
     * And update recoil state.
     * @param {string} id
     */
    const getAllService = async (id) => {
      let data = await getServices(id);
      setStatusList(data);
    };
    getAllService(id);
  }, []);


  return (
    <div className={st.cont}>
      <EditProject id={id} />
      <div className={st.addNewService}>
        <AddNewService id={id} />
      </div>

      <div className={st.serviceDisplay}>
        {/* Display each sevices using <SingleServiceStatusList> Component */}
        {statusList &&
          statusList.map((item) => (
            <SingleServiceStatusList id={item.id} key={item.id} />
          ))}
      </div>
    </div>
  )
}
