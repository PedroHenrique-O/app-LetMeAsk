import { useHistory } from "react-router-dom";
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";



 



export function Home(){
    const {user, signInWithGoogle} = useAuth();
    const history = useHistory();
    async function handleCreateRoom  () {
        if (!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new')

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="ìcone do google"/>
                        Crie sua sala com o google!
                    </button>
                    <div className="separator"> Ou  entre em uma sala</div>
                    <form> 
                        <input 
                    type="text"
                    placeholder="Digite o código da sua sala"
                    />
                    <Button > Entrar na sala </Button>
                    
                    </form>
                </div>
            </main>

        </div>
    )
}
