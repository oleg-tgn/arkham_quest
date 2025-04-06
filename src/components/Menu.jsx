import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div>      
      <nav>
        <ul className='menu'>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Расследование</NavLink></li> 
          <li><NavLink to="/AddressBook">Адресная книга</NavLink></li>
          <li><NavLink to="/Questions">Вопросы</NavLink></li>             
        </ul>
      </nav>
    </div>
  );
};

export default Menu;