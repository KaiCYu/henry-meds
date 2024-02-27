import { useContext, createContext, useState } from 'react';
import mockSchedule from './mockData';

const defaultContext = {
    userId: undefined, // This also handles app "routing"
    isProvider: false,
    isClient: false,

    providerAvailability: mockSchedule
}

const GO_HOME_OBJECT = {
  userId: undefined, 
  isProvider: false,
  isClient: false,
}

const AppContext = createContext(undefined);

const AppContextProvider = ({ children }) => {
  const [context, setContext] = useState(defaultContext);

  const value = {
      context,  
      setContext
  };

  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

const AppContextConsumer = ({children}) => {  
  return (
    <AppContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('AppContextConsumer must be used within AppContextProvider'); 
        }
        return children(context)
      }}
    </AppContext.Consumer>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if(context === undefined)
    throw new Error('useAppContext must be used within AppContextProvider');
  return context;
}

export {
  AppContextProvider,
  AppContextConsumer, 
  useAppContext,
  defaultContext,
  GO_HOME_OBJECT
}