"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./style.css";
import LogoutLink from "../LogoutLink";

const navItems = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    name: "All Projects",
    link: "/dashboard/projects",
  },
  {
    id: 3,
    name: "Mailing List",
    link: "/dashboard/subs",
  },
  {
    id: 4,
    name: "New Project",
    link: "/dashboard/new",
  },
  {
    id: 5,
    name: "Client Search",
    link: "/status",
  },
  {
    id: 6,
    name: "Home Page",
    link: "/",
  },
];

async function DashBoardNav() {
  const pathname = usePathname();
  return (
    <nav className="dashboard-nav">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className={`${pathname === item.link ? "active-Link" : "inactive-Link"}`}
        >
          {item.name}
        </Link>
      ))}
      <LogoutLink/>
    </nav>
  );
}

export default DashBoardNav;
