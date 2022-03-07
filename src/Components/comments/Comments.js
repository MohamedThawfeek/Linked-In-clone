import { Avatar } from "@material-ui/core";
import React from "react";
import "./Comments.css";
import { useSelector } from "react-redux";


const Comments = ({ user, image, updatedAt, msg }) => {
  const users = useSelector((state) => state.user);

  return (
    <div className="comments">
    

      <div
        className={`comments__content ${
          user === users.displayName && "comment__reciver"
        } `}
      >
        <div className="image">
          <Avatar src={image} />
        </div>
        <div className="reciver__message">
          <p>{user}</p>
          <h5>{msg}</h5>
          <p className="time">{new Date(updatedAt?.toDate()).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;

