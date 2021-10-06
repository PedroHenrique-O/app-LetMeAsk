import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import {AuthContextProvider} from './contexts/AuthContext'




function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
      <AuthContextProvider> 
    
        <Route path="/" exact={true} component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      
      </AuthContextProvider>

      </BrowserRouter>

    </div>
  );
}

export default App;
