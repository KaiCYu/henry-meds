import { useContext } from 'react';
import { AppContext } from './AppContext';
import { Button } from 'react-bootstrap';

// import { Provider } from './Provider';
// import { Client } from './Client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const setProvider = () => {
  const providerContext = {
    availability: [],
  };
}


const setClient = () => {
  const clientContext = {};
}

function App() {
  const context = useContext(AppContext);
  console.log('context::: ', context)

  return (
    <div className="App">
      <header className="App-header">
      Are you a client or a provider?
      
      <div>
        <Button variant="primary">Provider</Button>
        <Button variant="primary">Client</Button>
      </div>
      </header>
    </div>
  );
}


export default App;
