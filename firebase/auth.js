import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './config'; 

const getUserFromLocalStorage = () => {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  };

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();

      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
            if (storedUser) {
                setUser(storedUser);
              }
          setUser(null);
          localStorage.removeItem('user');
          router.push('/login');
        }
      });

      return () => unsubscribe();
   
  }, [router]);

  return user;
};
