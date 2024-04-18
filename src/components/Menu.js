import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>      
      <nav>
        <ul>
          <li><Link to="/">Расследование</Link></li> 
          <li><Link to="/AddressBook">Адресная книга</Link></li>             
        </ul>
      </nav>
    </div>
  );
};

export default Menu;