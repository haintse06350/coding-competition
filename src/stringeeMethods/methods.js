import { API } from "../api/videoCall";
import { addVideo } from "../models/room";

const PROJECT_ID =
  process.env.PROJECT_ID || "SKx8WwEq4avcNA6OqJ6o3VT4HC9WSUmdjE";
const PROJECT_SECRET =
  process.env.PROJECT_SECRET || "cWtLQ0JGZWRyYWVLbE5pZWNuUTFiTVFkbFF2WXY0WlM=";

const api = new API(PROJECT_ID, PROJECT_SECRET);
const StringeeClient = window.StringeeClient;
const StringeeVideo = window.StringeeVideo;

export class Stringee {
  constructor() {
    this.userToken = "";
    this.roomId = "";
    this.roomToken = "";
    this.room = undefined;
    this.callClient = undefined;
  }

  async auth(username) {
    return new Promise(async (resolve) => {
      const userId = username
        ? username
        : "guest" + `-${Math.floor((Math.random() * 1000).toFixed(5))}`;
      const userToken = await api.getUserToken(userId);
      localStorage.setItem("userToken", userToken);
      this.userToken = userToken;

      if (!this.callClient) {
        const client = new StringeeClient();
        client.on("authen", function (res) {
          console.log("on authen: ", res);
          resolve(res);
        });
        client.on("connect", function (res) {
          console.log("on connect: ", res);
        });
        this.callClient = client;
      }
      this.callClient.connect(userToken);
    });
  }

  async subscribe(videoContainer, trackInfo) {
    const track = await this.room.subscribe(trackInfo.serverId);
    track.on("ready", () => {
      const videoElement = track.attach();
      addVideo(videoContainer, videoElement);
    });
  }

  async publish(screenSharing, videoContainer, roomToken) {
    const localTrack = await StringeeVideo.createLocalVideoTrack(
      this.callClient,
      {
        audio: true,
        video: true,
        screen: screenSharing,
        videoDimensions: { width: 640, height: 360 },
      }
    );

    const videoElement = localTrack.attach();
    const roomData = await StringeeVideo.joinRoom(this.callClient, roomToken);
    const room = roomData.room;
    if (!this.room) {
      this.room = room;
      room.clearAllOnMethos();
      room.on("addtrack", (e) => {
        const track = e.info.track;

        console.log("addtrack", track);
        if (track.serverId === localTrack.serverId) {
          console.log("local");
          return;
        }
        this.subscribe(videoContainer, track);
      });

      console.log(roomData);
      // Join existing tracks
      roomData.listTracksInfo.forEach((info) =>
        this.subscribe(videoContainer, info)
      );
    }
    room.on("removetrack", (e) => {
      console.log(e);
      const track = e.track;
      if (!track) {
        return;
      }

      const mediaElements = track.detach();
      mediaElements.forEach((element) => element.remove());
    });
    await room.publish(localTrack);
    console.log("room publish successful");
    return videoElement;
  }
}
