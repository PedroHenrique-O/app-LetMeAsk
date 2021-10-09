import {FormEvent, useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss'
import { Button } from "../components/Button";
import { useAuth } from '../hooks/useAuth';
import { getDatabase, ref, push, set} from 'firebase/database'
 
 
// import { useContext } from 'react';




export function NewRoom(){
    const history =  useHistory()
    const {user} = useAuth();
    const [newRoom, setNewRoom] = useState("");
    
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        console.log(newRoom)
        
        if (newRoom.trim() ===" "){
            return;
        }
        const database = getDatabase();
        const roomRef =  ref (database,'rooms' );
        const newRoomRef = push(roomRef)
        set(newRoomRef, {
            
            title: newRoom,
            authorId: user?.id,

        })
        // set(ref (database,'rooms' ),{
            
            

            // title: newRoom,
            // authorId: user?.id,
            



        // });
        history.push(`/rooms/${newRoomRef.key}`)

    }


    return (
        <div id="page-auth">
            <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong>Crie salas de Q&amp;E ao vivo!</strong>
            <p> Tire suas dúvidas em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo" />
                    {/* <h1> Olá, {user?.name} </h1> */}
                    <h2> Criar uma nova sala </h2>
                   
                    <form onSubmit={handleCreateRoom}> 
                        <input 
                    type="text"
                    placeholder="Nome da sala"
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
                    />
                    
                    <Button > Cria sala </Button>
                    
                    </form>
                    <p> Quer entrar em uma sala existente? <Link to="/">Clique aqui </Link> </p>
                </div>
            </main>
        </div>
    )
}
