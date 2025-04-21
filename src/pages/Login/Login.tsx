import GoogleAuth from 'components/GoogleAuth';
import { Layout } from 'components/Layout';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'hooks/firebase';
import { LayoutHome } from 'components/LayoutHome';
import { Info } from 'components/Info';

export const Login = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout variant="book" heightClass="h-full">
        <Layout variant="content">
          <p>Загрузка...</p>
        </Layout>
      </Layout>
    );
  }

  return (
    <LayoutHome>
      <Info />

      <p>Чтобы начать игру вам нужно войти в систему используя ваш аккаунт Google.</p>
      <GoogleAuth />
    </LayoutHome>
  );
};
