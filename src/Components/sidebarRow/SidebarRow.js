import React from "react";
import "./SidebarRow.css";
import { Avatar } from "@material-ui/core";
import { CheckBoxOutlineBlank, Bookmark } from "@material-ui/icons";

const SidebarRow = ({ image, name }) => {
  return (
    <div className=" sidebarRow">
      <div className="sidebarRow__top">
        <div className="background"></div>
        <Avatar src={image} className="img" />
        <h3>{name}</h3>
      </div>
      <hr />
      <div className="sidebarRow__center">
        <div className="sidebarRow__center--content">
          <p>Connections</p>
          <strong>Grow your network</strong>
        </div>
        <hr />

        <div className="sidebarRow__center--content">
          <p>Access exclusive tools & insights</p>
          <h5>
            <CheckBoxOutlineBlank className="check" /> Try Premium for free
          </h5>
        </div>
        <hr />
      </div>
      <div className="sidebarRow__bottom">
        <Bookmark className="mark" />
        <h5> My items </h5>
      </div>
    </div>
  );
};

export default SidebarRow;
