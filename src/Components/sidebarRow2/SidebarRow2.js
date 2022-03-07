import React from "react";
import "./SidebarRow2.css";
import { Add } from "@material-ui/icons";
import {IconButton} from '@material-ui/core'

const SidebarRow2 = () => {
  return (
    <div className="sidebarRow2">
      <p>groups</p>
      <div className="sidebarRow2__center">
        <p>event</p>
        <IconButton className="IconButton">
        <Add />
        
        </IconButton>
      </div>

      <p>follow hashtags</p>
    </div>
  );
};

export default SidebarRow2;
