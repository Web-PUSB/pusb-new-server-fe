import { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem('session'));
    if (storedSession) {
      setSession(storedSession);
      setStatus('authenticated');
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, status, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
