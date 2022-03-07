import React from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { Button } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch } from "react-redux";
import { addUser } from "../../Components/redux/action/user";
import { auth, google, facebook } from "../../Components/firebase/Firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const dispatch = useDispatch();

  const signGoogle = async () => {
    const result = await signInWithPopup(auth, google);
    dispatch(addUser(result.user));

    localStorage.setItem('LoginDetails', JSON.stringify(result.user))

  };

  const signFacebook = async () => {
    const result = await signInWithPopup(auth, facebook);
    dispatch(addUser(result.user));

    localStorage.setItem('LoginDetails', JSON.stringify(result.user))

  };

  return (
    <div className="login">
      <div className="login__card">
        <img src={logo} alt="" />

        <Button type="submit" onClick={signGoogle}>
          <span>
            <GoogleIcon /> google Login
          </span>
        </Button>
        <Button type="submit" onClick={signFacebook}>
          <span>
            <FacebookIcon /> facebook Login
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
