import CopyImg from "../assets/images/copy.svg";
import "../styles/RoomCode.scss";
type Code = {
  code: string;
};

export function RoomCode(props: Code) {
  function CopyRoomCodeToClipBoard() {
    navigator.clipboard.writeText("#dsadadaa");
  }
  return (
    <button className="room-code" onClick={CopyRoomCodeToClipBoard}>
      <div>
        <img src={CopyImg} alt="Copia" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  );
}
