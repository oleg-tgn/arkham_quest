import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'hooks/firebase';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Загрузка...</div>;

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
