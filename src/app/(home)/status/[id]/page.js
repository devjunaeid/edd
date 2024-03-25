import { getStatusByID } from "@/server/action";
import st from "./page.module.css";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiCycle } from "react-icons/gi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
export default async function page({ params }) {
  const { id } = params;
  const data = await getStatusByID(id);
  const st_list = () => {
    let li = [];
    if (data.id) {
      Object.keys(data.status_list).forEach((key) => {
        const value = data.status_list[key];
        li.push(value);
      });
    }
    return li;
  };

  const all_status = st_list();

  return (
    <div>
      {data.id ? (
        <div>
          <div className={st.info_cont}>
            <h1>
              Wellcome <span>{data.client_name}</span>
            </h1>
            <div>
              <p>
                <span>Phone: </span>
                {data.phone}
              </p>
              <p>
                <span>Project Name: </span>
                {data.project_name}
              </p>
              <p>
                <span>Date: </span>
                {data.date}
              </p>
              <p>
                <span>Type: </span>
                {data.project_type}
              </p>
            </div>
          </div>

          <div className={st.status_cont}>
            {all_status.map((item, key) => (
              <div key={key} className={st.singleSt}>
                <div className={st.status_icon}>
                  {key === data.status ? (
                    <GiCycle color="lightblue" size={32} />
                  ) : key < data.status ? (
                    <IoCheckmarkDoneCircleOutline
                      color="lightgreen"
                      size={32}
                    />
                  ) : (
                    <MdOutlinePendingActions color="yellow" size={32} />
                  )}
                </div>
                <div>
                  <p>{item.title}</p>
                  <p className={st.status_date}>Date: {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Record Not Found</p>
      )}
    </div>
  );
}
