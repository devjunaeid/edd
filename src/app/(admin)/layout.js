import DashBoardNav from "@/components/DashBoardNav/DashBoardNav";
import "./style.css";
import RecoilProvider from "@/providers/RecoilProvider";


// Admin Page metadata.
export const metadata = {
  title: "Admin EDD",
  description: "Manage Your Web",
};

export default async function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <section className="dash-layout">
          <RecoilProvider>
            <DashBoardNav />
            {children}
          </RecoilProvider>
        </section>
      </body>
    </html>
  );
}
