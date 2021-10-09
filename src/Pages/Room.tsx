import { getDatabase, onValue, ref } from "@firebase/database";
import { push } from "firebase/database";
import { type } from "os";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import "../styles/room.scss";
import { RoomParams, Questions, FireBaseQuestions } from "./RoomParams";

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [question, setQuestion] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");

  const roomId = params.id;

  useEffect(() => {
    const database = getDatabase();

    return onValue(ref(database, `/rooms/${roomId}`), (snapshot) => {
      const retorno = snapshot.val();
      const databaseRoom = snapshot.val();
      const FireBaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(FireBaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );
      console.log("ParsedQuestions", parsedQuestions);
      console.log("snapshot Original", retorno);
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must be logged in ");
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const database = getDatabase();
    const roomRef = ref(database, `rooms/${roomId}/questions`);
    push(roomRef, question);
  }

  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logo} alt="logo" />
            <div>
              <RoomCode code={params.id} />
            </div>
          </div>
        </header>
      </div>

      <main className="main-content">
        <div className="room-title">
          <h1>Sala {title} </h1>

          {question.length > 0 && <span> {question.length} perguntas </span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            id="tsextarea"
            placeholder="O que você está pensando?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            <span>
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <div></div>
              )}
            </span>
            <Button aria-disabled={!user}> Enviar pergunta </Button>
          </div>
        </form>
        <div className="question-list">
          {question.map((question) => {
            return (
              <Question
                content={question.content}
                author={{
                  name: question.author.name,
                  avatar: question.author.avatar,
                }}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
