import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Menu: FC = () => {
  const tabClass = 'block px-4 py-2 rounded-l-lg w-40 text-right text-md font-medium shadow-md transition-colors';
  const activeClass = 'bg-amber-900 text-amber-100 ';
  const inactiveClass = 'bg-zinc-800 hover:bg-zinc-700 text-slate-100';

  return (
    <nav>
      <ul className="space-y-3">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${tabClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Расследование
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/AddressBook" 
            className={({ isActive }) =>
              `${tabClass} ${isActive ? activeClass : inactiveClass}`
            }>
            Адресная книга
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/Questions" 
            className={({ isActive }) =>
              `${tabClass} ${isActive ? activeClass : inactiveClass}`
            }>
            Вопросы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

