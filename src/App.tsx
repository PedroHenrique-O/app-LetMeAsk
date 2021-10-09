import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import {AuthContextProvider} from './contexts/AuthContext'
import { Room } from './Pages/Room';




function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
        <AuthContextProvider> 
          <Switch>
    
          <Route path="/" exact={true} component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room}/>
          </Switch>
      
        </AuthContextProvider>

      </BrowserRouter>

    </div>
  );
}

export default App;
