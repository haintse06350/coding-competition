import React, { useState, useEffect } from "react";
import { useStyles } from "./styles.style";
import { useHistory, useLocation } from "react-router-dom";
import {
  createRoom,
  setRestToken,
  publishVideo,
  addVideo,
  join,
} from "../models/room";
import MeetingIcon from "../assets/meeting.png";

export const Room = () => {
  const classes = useStyles();
  const location = useLocation();
  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState("");

  const onChangeRoomId = (event) => {
    setRoomId(event.target.value);
  };

  const onCreateRoom = async () => {
    const videoContainer = document.getElementById("videos");

    try {
      const room = await createRoom();
      setRoom(room);
      const videoElm = await publishVideo(
        false,
        videoContainer,
        room?.roomToken
      );
      console.log(videoElm);
      addVideo(videoContainer, videoElm);
    } catch (error) {
      console.log(error);
    }
  };

  const onJoinRoom = async () => {
    const videoContainer = document.getElementById("videos");
    try {
      await join(false, videoContainer, roomId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRestToken();
  }, []);

  return (
    <div className={classes.container}>
      <div id="videos" className={classes.videoGrid}></div>
      <div className={classes.form}>
        {/* <img src={MeetingIcon} alt="meeting" className={classes.mettingLogo} /> */}
        <div className={classes.joinARoom}>
          <input
            className={classes.roomIdInput}
            value={roomId}
            placeholder="Enter room id"
            onChange={(e) => onChangeRoomId(e)}
          />
          <button className={classes.joinRoomButton} onClick={onJoinRoom}>
            Join a room
          </button>
        </div>
        <div className={classes.createARoom}>
          <button className={classes.createRoomButton} onClick={onCreateRoom}>
            Create a room
          </button>
        </div>

        {room && (
          <div className={classes.room}>
            <div className={classes.roomName}>Room Id: {room.roomId}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
