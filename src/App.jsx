import { AppContextProvider } from './AppContext';

import { Main } from './Main';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
}

export default App;
