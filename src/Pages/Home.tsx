import { useHistory } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { get, getDatabase, ref } from "@firebase/database";

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }
    const database = getDatabase();
    const roomRef = get(ref(database, `rooms/${roomCode}`));

    if (!(await roomRef).exists()) {
      alert("Room does not exists.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;E ao vivo!</strong>
        <p> Tire suas dúvidas em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="ìcone do google" />
            Crie sua sala com o google!
          </button>
          <div className="separator"> Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sua sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button> Entrar na sala </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
