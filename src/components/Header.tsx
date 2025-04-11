import { FC } from 'react';
import GoogleAuth from "./GoogleAuth";

export const Header: FC = () => {
  return (
    <header className="relative text-center py-3">
      <h1 className="text-4xl font-bold tracking-wide text-yellow-800 drop-shadow-[0_0_6px_rgba(213,163,52,0.4)]">
        <span className='stroke-pink-700'>Тайны Аркхэма</span>
      </h1>
      <div className="absolute top-4 right-6">
        <GoogleAuth />
      </div>
    </header>
  );
};
