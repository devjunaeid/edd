import "./page.module.css";
import ReactTable from "@/components/Table/ReactTable";

function page() {
  return (
    <div>
      {/* Data table listing all projects. */}
      <ReactTable />
    </div>
  );
}

export default page;
