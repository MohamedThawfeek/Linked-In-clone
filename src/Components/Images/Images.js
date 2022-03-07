import React, { useEffect, useState } from "react";
import "./Images.css";
import { Avatar, Button } from "@material-ui/core";
import {
  ChatBubbleOutline,
  ThumbUpOutlined,
  Reply,
  ExpandMore,
  ExpandLess,
  Send,
} from "@material-ui/icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, timestamp as time } from "../firebase/Firebase";
import Comments from "../comments/Comments";
import { useSelector } from "react-redux";

const Images = ({ imageId, image, profilePic, timestamp, title, username }) => {
  const user = useSelector((state) => state.user);
  const [box, setBox] = useState(false);
  const [commentsInput, setCommentsInput] = useState("");
  const [viewComments, setViewComments] = useState([]);

  // input uploder Function;

  const sendComments = async () => {
    try {
      if(imageId){
      if (commentsInput) {
        await addDoc(collection(db, "images", imageId, "comments"), {
          title: commentsInput,
          name: user.displayName,
          profilePic: user.photoURL,
          timestamp: time,
        });
      } 
    }
    else {
      return;
    }

      setCommentsInput("");
    } catch (error) {
      console.log(error);
    }
  };

  // get comments

  useEffect(() => {
    const q = query(
      collection(db, "images", imageId, "comments"),
      orderBy("timestamp", "asc")
    );
    onSnapshot(q, (snapShot) => {
      setViewComments(snapShot.docs.map((doc) => doc.data()));
    });
  }, [imageId]);

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic ? profilePic : null} className="post__avatar" />
        <div className="post__info">
          <h3>{username ? username : null}</h3>
          <p className="date">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{title}</p>
      </div>
      <div className="post__image">
        <img src={image ? image : null} alt="" />
      </div>

      <hr />

      <div className="post__options">
        <div className="post__option">
          <ThumbUpOutlined />
          <p>Like</p>
        </div>
        <div className="post__option">
          <ChatBubbleOutline />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <Reply className="post__option3" />
          <p>Share</p>
        </div>
      </div>
      <div className="option">
        {!box ? (
          <p onClick={() => setBox(true)} className="expand">
            CommentsMore
            <ExpandMore />
          </p>
        ) : (
          <p onClick={() => setBox(false)} className="expand">
            CommentsLess
            <ExpandLess />
          </p>
        )}

        {box ? (
          <div className="commentBox">
            <div className="comments">
              <div className="commentBox__top">
                {viewComments.map((comments, index) => (
                  <Comments
                    key={index}
                    user={comments.name}
                    image={comments.profilePic}
                    updatedAt={comments.timestamp}
                    msg={comments.title}
                  />
                ))}
              </div>
              <div className="commentBox__bottom">
                <Avatar src={profilePic} />
                <input
                  type="text"
                  placeholder={`comment ${username}`}
                  onChange={(e) => setCommentsInput(e.target.value)}
                  value={commentsInput}
                />
                <Button type="submit" onClick={sendComments}>
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Images;
