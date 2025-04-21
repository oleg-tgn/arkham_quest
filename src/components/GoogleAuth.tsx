import { useEffect, useState } from 'react';
import { auth, provider } from 'hooks/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex items-center gap-3 text-white">
      {user ? (
        <>
          <span className="text-sm">{user.displayName}</span>
          <button
            onClick={logout}
            className="text-xs bg-[#8b5e3c] hover:bg-[#a16c45] px-3 py-1 rounded shadow"
          >
            Выйти
          </button>
        </>
      ) : (
        <button
          onClick={login}
          className="text-xs bg-[#8b5e3c] hover:bg-[#a16c45] px-3 py-1 rounded shadow font-semibold"
        >
          Войти
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
