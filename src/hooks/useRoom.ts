import { getDatabase, onValue } from "@firebase/database";
import { ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Questions, FireBaseQuestions} from "../Pages/RoomParams";
import { useAuth } from "./useAuth";


export function useRoom(roomId: string){
    const {user} =  useAuth();
    const [question, setQuestion] = useState<Questions[]>([]);
    const [title, setTitle] = useState("");


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
                likeCount: Object.values(value.likes ?? {}).length,
                likeId: Object.entries(value.likes ?? {}).find(([key, likes]) => likes.authorId === user?.id)?.[0],

              };
            }
          );
          console.log("ParsedQuestions", parsedQuestions);
          console.log("snapshot Original", retorno);
          setTitle(databaseRoom.title);
          setQuestion(parsedQuestions);
        });

        
      }, [roomId, user?.id]);


      return {question, title}
    
}