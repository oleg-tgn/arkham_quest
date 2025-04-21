import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'hooks/firebase';

const PrivateRoute = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Загрузка...</div>;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
