'use client'
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserDetails({children}) {
  const [user, setUser] = useState({name:"",email:""});


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export const useGlobalContext = () => useContext(UserContext)