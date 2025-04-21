import { FC } from 'react';
import GoogleAuth from './GoogleAuth';
import { NavLink } from 'react-router-dom';
import house from '/img/house.svg';

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center relative text-center py-3 px-4">
      <div className="text-white">
        <NavLink to="/">
          <div className="flex flex-row gap-2">
            <img src={house} style={{ width: '15px' }} />
            Главная
          </div>
        </NavLink>
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
