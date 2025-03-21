import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './context/sessionContext';
import CustomLoading from './components/CustomLoading';

export default function Home() {
  const { session, status } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/admin/pusb');
    } else if (status === 'unauthenticated') {
      navigate('/auth/signin');
    }
  }, [status, session, navigate]);

  if (status === 'loading') {
    return <CustomLoading />;
  }

  return null;
}
