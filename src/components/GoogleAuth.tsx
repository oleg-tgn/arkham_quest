// src/components/GoogleAuth.tsx
import { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="text-white flex flex-col items-center gap-2">
      {user ? (
        <>
          <img src={user.photoURL ?? ""} alt="Avatar" className="w-10 h-10 rounded-full" />
          <p className="text-sm">{user.displayName}</p>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
            Выйти
          </button>
        </>
      ) : (
        <button onClick={login} className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
          Войти с Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
