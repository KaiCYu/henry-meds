import { createContext } from 'react';
const defaultContext = {
    userId: undefined,
    // isProvider: false,
    // isClient: false,
  }
  
export const AppContext = createContext(defaultContext);
