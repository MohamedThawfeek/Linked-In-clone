import React, { useState } from 'react'
import { useSelector } from "react-redux";
import {  LinearProgress } from "@material-ui/core";
import { db, storage, timestamp } from "../firebade/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,

} from "firebase/firestore";
import PostUploder from '../postuploder/PostUploder';








const VideoUploder = () => {

    const [progress, setProgress] = useState(0)



  return (
    <div>VideoUploder</div>
  )
}

export default VideoUploder