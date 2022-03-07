import React, { useState, useEffect } from "react";
import "./Videos.css";
import { Avatar, Button } from "@material-ui/core";
import {
  ChatBubbleOutline,
  ThumbUpOutlined,
  Reply,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import ReactPlayer from "react-player";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, timestamp as time } from "../firebase/Firebase";
import VideoComments from "../videoComments/VideoComments";
import { useSelector } from "react-redux";

const Videos = ({ videoId, video, profilePic, timestamp, title, username }) => {
  const users = useSelector((state) => state.user);
  const [box, setBox] = useState(false);
  const [commentsInput, setCommentsInput] = useState("");
  const [viewComments, setViewComments] = useState([]);

  const sendComments = async () => {
    try {
      if (videoId) {
        if (commentsInput) {
          await addDoc(collection(db, "videos", videoId, "comments"), {
            title: commentsInput,
            name: users.displayName,
            profilePic: users.photoURL,
            timestamp: time,
          });
        }
      } else {
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
      collection(db, "videos", videoId, "comments"),
      orderBy("timestamp", "asc")
    );
    onSnapshot(q, (snapShot) => {
      setViewComments(snapShot.docs.map((doc) => doc.data()));
    });
  }, [videoId]);

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
        <p>{title ? title : null}</p>
      </div>
      <div className="post__image">
        <ReactPlayer
          controls
          width="580px"
          height="240px"
          url={video ? video : null}
        />
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
                  <VideoComments
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
                  send
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Videos;
