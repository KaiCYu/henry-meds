import { useContext, useState } from 'react';
import { useAppContext } from './AppContext';

import './App.css';

const Client = () => {
  const context = useAppContext();
  // console.log('context in client component::: ', context)

  return (
    <div className="client-container">
      
    </div>
  );
}

export { Client };
