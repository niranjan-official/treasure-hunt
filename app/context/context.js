'use client'
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserDetails({children}) {
  const [load, setLoad] = useState(false);

  return (
    <UserContext.Provider value={{ load,setLoad }}>
      {children}
    </UserContext.Provider>
  );
}
export const useGlobalContext = () => useContext(UserContext)