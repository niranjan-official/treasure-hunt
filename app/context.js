'use client'
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserDetails({ children }) {
  const [load, setLoad] = useState(false);
  const [scan, setScan] = useState(false);

  return (
    <UserContext.Provider value={{ load, setLoad, scan, setScan }}>
      {children}
    </UserContext.Provider>
  );
}
export const useGlobalContext = () => useContext(UserContext)