import React, { useEffect, useState } from "react";
import PostUploder from "../postuploder/PostUploder";
import "./Feed.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import Images from "../Images/Images";
import Videos from "../videos/Videos";

const Feed = () => {
  const [imagePost, setImagePost] = useState([]);
  const [videoPost, setVideoPost] = useState([]);

  //get Uploded Image

  useEffect(() => {
    const q = query(collection(db, "images", ), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapShot) => {
      setImagePost(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            image: doc.data(),
          };
        })
      );
    });
  }, []);

  //get Uploded Videos

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapShot) => {
      setVideoPost(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            video: doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className="feed">
      <PostUploder />

      <div className="posts">
        {imagePost.map((imagepost) => (
  
          <Images
            key={imagepost.id}
            imageId={imagepost.id}
            image={imagepost.image.image}
            profilePic={imagepost.image.profilePic}
            timestamp={imagepost.image.timestamp}
            title={imagepost.image.title}
            username={imagepost.image.username}
          />
        ))}
      </div>
      <div className="posts">
        {videoPost.map((videoPost) => (
          <Videos
            key={videoPost.id}
            videoId={videoPost.id}
            video={videoPost.video.video}
            profilePic={videoPost.video.profilePic}
            timestamp={videoPost.video.timestamp}
            title={videoPost.video.title}
            username={videoPost.video.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
