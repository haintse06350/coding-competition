import { API } from "../api/videoCall";
import { Stringee } from "../stringeeMethods/methods";

const PROJECT_ID =
  process.env.PROJECT_ID || "SKx8WwEq4avcNA6OqJ6o3VT4HC9WSUmdjE";
const PROJECT_SECRET =
  process.env.PROJECT_SECRET || "cWtLQ0JGZWRyYWVLbE5pZWNuUTFiTVFkbFF2WXY0WlM=";

const api = new API(PROJECT_ID, PROJECT_SECRET);
const stringee = new Stringee();

export const setRestToken = async () => {
  return api.setRestToken();
};

export const createRoom = async () => {
  const room = await api.createRoom();
  const { roomId } = room;
  const roomToken = await api.getRoomToken(roomId);
  return { ...room, roomToken };
};

export const addVideo = (videoContainer, video) => {
  video.setAttribute("controls", "true");
  video.setAttribute("playsinline", "true");
  videoContainer.appendChild(video);
};

export const publishVideo = async (
  screenSharing,
  videoContainer,
  roomToken
) => {
  await stringee.auth();
  return stringee.publish(screenSharing, videoContainer, roomToken);
};

export const join = async (screenSharing, videoContainer, roomId) => {
  const roomToken = await api.getRoomToken(roomId);
  await stringee.auth();
  await stringee.publish(screenSharing, videoContainer, roomToken);
};

export const joinWithId = async () => {
  const roomIdFromUser = prompt("Dán Room ID vào đây nhé!");
  if (roomIdFromUser) {
    await join(roomIdFromUser);
  }
};
