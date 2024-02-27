import { Button } from 'react-bootstrap';

import { useAppContext, GO_HOME_OBJECT } from './AppContext';
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
  const handleGoBack = () => {
    setContext({...context, ...GO_HOME_OBJECT})
  }

  // console.log('context in main:::: ', context);
  return (
    <div className="App">
    <header className="App-header">

      { 
        !context.isProvider && !context.isClient && (
          <div>
            Are you a client or a provider?
            <div>
              <Button variant="primary" onClick={handleSetProvider}>Provider</Button>
              <Button variant="primary" onClick={handleSetClient}>Client</Button>
            </div>
          </div>
        )
      }
      {
        context.isProvider && (
          <Provider handleGoBack={handleGoBack} />
        )
      }
      {
        context.isClient && (
          <Client handleGoBack={handleGoBack} />
        )
      }
    </header>
  </div>
  )
}

export { Main }