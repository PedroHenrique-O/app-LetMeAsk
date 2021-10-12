import CopyImg from "../assets/images/copy.svg";
import "../styles/RoomCode.scss";
import { useParams } from "react-router-dom";
type Code = {
  code: string;
};
export type RoomParams = {
  id: string;
};

export function RoomCode(props: Code) {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  function CopyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(roomId);
  }
  return (
    <button className="room-code" onClick={CopyRoomCodeToClipBoard}>
      <div>
        <img src={CopyImg} alt="Copia" />
      </div>
      <span>Sala: {props.code}</span>
    </button>
  );
}
