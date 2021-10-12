import "../styles/room.css";
import { getDatabase, ref, remove, update } from "@firebase/database";

import { useHistory, useParams } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { RoomParams } from "./RoomParams";
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, question } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta")) {
      const database = getDatabase();
      await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
    }
  }

  async function handleCheckQuestionAnswered(questionId: string) {
    const answered = {
      isAnswered: true,
    };
    const database = getDatabase();
    const CheckQuestionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );
    update(CheckQuestionRef, answered);
  }

  async function handleHighlightQuestion(questionId: string) {
    const isHighlighted = {
      isHighlighted: true,
    };
    const database = getDatabase();
    const hightlightRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );
    update(hightlightRef, isHighlighted);
  }

  async function handleEndRoom() {
    const endedAt = new Date();
    const EndRoom = {
      endTime: endedAt,
    };
    const database = getDatabase();
    const questionRef = ref(database, `rooms/${roomId}/`);
    update(questionRef, EndRoom);
    history.push("/");
  }

  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content1">
            <img src={logo} alt="Letmeask" />
            <div className="end-and-code">
              <RoomCode code={roomId} />
              <Button isOutlined onClick={handleEndRoom}>
                Encerrar sala
              </Button>
            </div>
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
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    >
                      <img src={checkImg} alt="marcar pergunta respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="dar destaque a pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
