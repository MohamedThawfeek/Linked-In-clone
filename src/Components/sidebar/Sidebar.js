import React from "react";
import "./Sidebar.css";
import SidebarRow from "../sidebarRow/SidebarRow";
import SidebarRow2 from "../sidebarRow2/SidebarRow2";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <SidebarRow image={user.photoURL} name={user.displayName} />

      <SidebarRow2 />
    </div>
  );
};

export default Sidebar;
