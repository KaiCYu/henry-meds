import { Button } from 'react-bootstrap';

import { useAppContext } from './AppContext';
import { Provider } from './Provider';
import { Client } from './Client';


const Main = () => {
  const { context, setContext } = useAppContext();

  const handleSetProvider = () => {
    setContext({
      ...context,
      isProvider: true,
      isClient: false,
    })
  }

  const handleSetClient = () => {
    setContext({
      ...context,
      isProvider: false,
      isClient: true,
    })
  }
  
  console.log('context:::: ', context);
  return (
    <div className="App">
    <header className="App-header">

      Are you a client or a provider?
      <>

      </>
      { 
        !context.userId && (
          <div>
            <Button variant="primary" onClick={handleSetProvider}>Provider</Button>
            <Button variant="primary" onClick={handleSetClient}>Client</Button>
          </div>
        )
      }
      {
        context.isProvider && (
          <Provider />
        )
      }
      {
        context.isClient && (
          <Client />
        )
      }
    </header>
  </div>
  )
}

export { Main }