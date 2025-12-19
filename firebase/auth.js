import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './config'; 

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
        
        // Only redirect to login if we're not already on public pages
        const publicPaths = ['/login', '/signup', '/'];
        if (!publicPaths.includes(window.location.pathname)) {
          router.push('/login');
        }
      }
      setLoading(false); // Set loading to false after auth state is determined
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading }; // Return both user and loading state
};