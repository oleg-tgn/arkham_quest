import { FC } from 'react';
import GoogleAuth from './GoogleAuth';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center relative text-center py-3 px-4">
      <div className="text-white">
        <NavLink to="/">Главная</NavLink>
      </div>
      <h1 className="text-4xl font-bold tracking-wide text-stone-300/80 drop-shadow-[0_0_6px_rgba(213,163,52,0.4)]">
        <span className="stroke-pink-700">Тайны Аркхэма</span>
      </h1>
      <div className="">
        <GoogleAuth />
      </div>
    </header>
  );
};
