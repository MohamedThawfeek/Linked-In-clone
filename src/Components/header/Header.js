import React, { useState } from "react";
import "./Header.css";
import { LinkedIn } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  Home,
  HdrStrongOutlined,
  Work,
  Textsms,
  Notifications,
  ArrowDropDown,
  AppsOutlined,
} from "@material-ui/icons";
import { Avatar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/action/user";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [headerOption, setHeaderOption] = useState("home");

  const signout = () => {
    dispatch(addUser(null));

    localStorage.removeItem("LoginDetails");
  };

  return (
    <div className="header">
      <div className="header__left">
        <LinkedIn />
        <input type="text" placeholder={`Search ${user.displayName}`} />
      </div>
      <div className="header__center">
        <div
          className={`header__option ${
            headerOption === "home" ? "header__option--active" : null
          } `}
          onClick={() => setHeaderOption("home")}
        >
          <Home fontSize="large" />
          <p>home</p>
        </div>
        <div
          className={`header__option ${
            headerOption === "network" ? "header__option--active" : null
          } `}
          onClick={() => setHeaderOption("network")}
        >
          <HdrStrongOutlined fontSize="large" />
          <p>My network</p>
        </div>
        <div
          className={`header__option ${
            headerOption === "job" ? "header__option--active" : null
          } `}
          onClick={() => setHeaderOption("job")}
        >
          <Work fontSize="large" />
          <p>jobs</p>
        </div>
        <div
          className={`header__option ${
            headerOption === "msg" ? "header__option--active" : null
          } `}
          onClick={() => setHeaderOption("msg")}
        >
          <Textsms fontSize="large" />
          <p>messaging</p>
        </div>
        <div
          className={`header__option ${
            headerOption === "notification" ? "header__option--active" : null
          } `}
          onClick={() => setHeaderOption("notification")}
        >
          <Notifications fontSize="large" />
          <p>notification</p>
        </div>
        <div className="image">
          <Avatar src={user.photoURL} />
          <p>
            me <ArrowDropDown />{" "}
          </p>
        </div>
      </div>
      <div className="header__right">
        <div className="appIcon">
          <AppsOutlined fontSize="large" />
          <p>
            work <ArrowDropDown />
          </p>
        </div>
        <Link to="#"> try premium for free</Link>

        <Button onClick={signout}>Signout</Button>
      </div>
    </div>
  );
};

export default Header;
