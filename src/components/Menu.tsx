import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const tabBase =
    'block w-full text-right text-md transition-all duration-200 px-6 py-3 hover:opacity-100 bg-[url("/img/tab.png")] bg-no-repeat bg-cover bg-center';
  const tabImage = (isActive: boolean) =>
    ` ${isActive ? 'scale-120 -translate-x-4 z-10' : 'opacity-75 translate-x-0'}`;

  return (
    <nav className="overflow-hidden pl-8 py-3">
      <ul className="flex flex-col gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `${tabBase} ${tabImage(isActive)} text-white`}
          >
            Расследование
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddressBook"
            className={({ isActive }) => `${tabBase} ${tabImage(isActive)} text-white`}
          >
            Адресная книга
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Map"
            className={({ isActive }) => `${tabBase} ${tabImage(isActive)} text-white`}
          >
            Карта
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Questions"
            className={({ isActive }) => `${tabBase} ${tabImage(isActive)} text-white`}
          >
            Вопросы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
