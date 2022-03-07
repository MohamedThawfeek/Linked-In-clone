import React from "react";
import '../../App.css'
import { useSelector } from "react-redux";
import Login from "../login/Login";
import Header from "../../Components/header/Header";
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Widget from '../../Components/widget/Widget'

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />

          <div className="app__body">
          <Sidebar />
          <Feed />
          <Widget />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
