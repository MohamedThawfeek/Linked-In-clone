import React, { useState } from "react";
import "./PostUploder.css";
import { useSelector } from "react-redux";
import { Avatar, Button, LinearProgress } from "@material-ui/core";
import { db, storage, timestamp } from "../firebase/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import {
  PhotoSizeSelectActualOutlined,
  PlayArrow,
  CalendarToday,
  ArtTrack,
  CloudUpload,
  Send
} from "@material-ui/icons";
// import VideoUploder from "../videoUploder/VideoUploder";

const PostUploder = () => {
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState(false);
  const [videos, setVideos] = useState(false);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);

  const image = () => {
    setImages(true);
  };

  const selectImage = () => {
    document.getElementById("image").click();
  };

  const video = () => {
    setVideos(true);
  };

  const selectVideo = () => {
    document.getElementById("video").click();
  };

  //Image Uploder function

  const handelimage = () => {

    const storageRef = ref(storage, `images/${images.name}`);
    const uploadTask = uploadBytesResumable(storageRef, images);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          Math.round(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            addDoc(collection(db, "images"), {
              title: input,
              timestamp: timestamp,
              profilePic: user.photoURL,
              username: user.displayName,
              image: url,
            });
            setProgress(0);
            setImages("");
            setInput("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  // Video Uploder function;

  const handelvideo = () => {
    const storageRef = ref(storage, `videos/${videos.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videos);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          Math.round(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            addDoc(collection(db, "videos"), {
              title: input,
              timestamp: timestamp,
              profilePic: user.photoURL,
              username: user.displayName,
              video: url,
            });
            setProgress(0);
            setVideos("");
            setInput("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };





 



  return (
    <div className="postuploder">
      <form>
        <div className="postuploder__top">
          <Avatar src={user.photoURL} />

          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder={`start post ${user.displayName} `}
            value={input}
          />
          <Button type="submit" onClick={handelimage}  >
            <Send/>
          </Button>
        </div>
      </form>

      <div className="postuploder__bottom">
        <div className="postuploder__bottom--content" onClick={image}>
          <PhotoSizeSelectActualOutlined
            style={{
              color: "#02758ad2",
            }}
          />
          <h5>photo</h5>
        </div>
        <div className="postuploder__bottom--content" onClick={video}>
          <button>
            <PlayArrow />
          </button>
          <h5>video</h5>
        </div>
        <div className="postuploder__bottom--content">
          <CalendarToday
            style={{
              color: "gold",
            }}
          />
          <h5>event</h5>
        </div>
        <div className="postuploder__bottom--content">
          <ArtTrack
            style={{
              color: "#80006be1",
            }}
          />
          <h5>write article</h5>
        </div>
      </div>

      {images ? (
        <div className="boxes">
          <div className="uploadBox">
            <CloudUpload className="cloud" onClick={selectImage} />

            <p className="details"> Selected : {images.name}</p>
          </div>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImages(e.target.files[0])}
            style={{
              display: "none",
            }}
          />

          <div className="buttons">
            <Button
              onClick={() => {
                handelimage();
                setImages(false);
              }}
            >
              upload
            </Button>
            <Button onClick={() => setImages(false)}>cancel</Button>
          </div>
        </div>
      ) : null}

      {videos ? (
        <div className="boxes">
          <div className="uploadBox">
            <CloudUpload className="cloud" onClick={selectVideo} />

            <p className="details"> Selected : {videos.name}</p>
          </div>

          <input
            id="video"
            type="file"
            accept="video/*"
            onChange={(e) => setVideos(e.target.files[0])}
            style={{
              display: "none",
            }}
          />

          <div className="buttons">
            <Button
              onClick={() => {
                handelvideo();
                setVideos(false);
              }}
            >
              upload
            </Button>
            <Button onClick={() => setVideos(false)}>cancel</Button>{" "}
          </div>
        </div>
      ) : null}
      {progress > 0 && (
        <LinearProgress variant="determinate" value={progress} />
      )}
    </div>
  );
};

export default PostUploder;
