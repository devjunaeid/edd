import st from "./page.module.css";
import { getServices, getStatusByID } from "@/server/action";
import { convertDate } from "@/utils/misc";
import SingleStatus from "@/components/Client/SingleStatus";
import Search from "@/components/Search/Search";
import preview from "@/../../public/previewStatus.png";

export const metadata = {
  title: "Engineers Design & Development",
  description: "Search for your Project",
  openGraph: {
    images: preview,
  },
};

export default async function page({ searchParams }) {
  //Getting search query from URL through <Search /> component.
  const { search } = searchParams;

  //Server Action: Get a project by ID.
  const data = await getStatusByID(search);

  //Server Action: Get all services of a Project.
  const serviceList = await getServices(search);
  
  return (
    <div className={st.status_cont}>
      <Search />
      {search ? (
        <div className={st.result_cont}>
          {typeof data != "string" ? (
            <div key={data.project_id} className={st.project_cont}>
              <div className={st.project_info}>
                <h2 className={st.projectId}>{data.project_id}</h2>
                <h2 className={st.projectName}>{data.project_name}</h2>
                <p className={st.type}>{data.project_type}</p>
                <p>
                  Client: <span>{data.client_name}</span>
                </p>
                <p>
                  Phone: <span>{data.phone}</span>
                </p>
                <p>
                  Date: <span>{convertDate(data.date)}</span>
                </p>
                <p>
                  Area: <span>{data.area}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className={st.noRecords}> No Record Found </div>
          )}
          <div className={st.list_cont}>
            {serviceList &&
              serviceList.map((item) => <SingleStatus data={item} />)}
          </div>
        </div>
      ) : (
        <p className={st.defaultMsg}>Search for projects</p>
      )}
    </div>
  );
}
