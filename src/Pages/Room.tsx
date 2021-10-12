import "../styles/room.scss";
import { getDatabase, ref, remove } from "@firebase/database";
import { push } from "firebase/database";

import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { RoomParams } from "./RoomParams";
import { useRoom } from "../hooks/useRoom";

export function Room() {
  const history = useHistory();
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;

  const { title, question } = useRoom(roomId);

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
  async function handleLikedQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      const database = getDatabase();
      await remove(
        ref(database, `rooms/${roomId}/questions/${questionId}/likes`)
      );
    } else {
      const authorId = {
        authorId: user?.id,
      };
      const database = getDatabase();
      const likeRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes`
      );
      push(likeRef, authorId);
    }
  }
  function handleAdminRoom() {
    history.push(`/admin/rooms/${roomId}`);
  }

  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content1">
            <img src={logo} alt="Letmeask" />
            <RoomCode code={roomId} />
          </div>
        </header>
      </div>

      <main className="main-content">
        <div className="room-title">
          <h1>Sala {title} </h1>

          {question.length > 0 && (
            <span className="span-questions">
              {" "}
              {question.length} perguntas{" "}
            </span>
          )}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            className="textarea"
            id="tsextarea"
            placeholder="O que você está pensando?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            <span>
              {user ? (
                <div className="user-info">
                  <img
                    className="img-avatar"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <span className="span-user">{user.name}</span>
                </div>
              ) : (
                <div></div>
              )}
            </span>
            <div className="sendQuestion-and-editRoom">
              <Button isOutlined onClick={handleAdminRoom}>
                Editar sala
              </Button>
              <Button aria-disabled={!user}> Enviar pergunta </Button>
            </div>
          </div>
        </form>
        <div className="question-list">
          {question.map((question) => {
            return (
              <Question
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                content={question.content}
                author={{
                  name: question.author.name,
                  avatar: question.author.avatar,
                }}
              >
                <button
                  className={`like-button ${question.likeId ? "liked" : ""}`}
                  type="button"
                  arial-label="Marcar como gostei"
                  onClick={() =>
                    handleLikedQuestion(question.id, question.likeId)
                  }
                >
                  {question.likeCount > 0 && (
                    <span> {question.likeCount} </span>
                  )}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
