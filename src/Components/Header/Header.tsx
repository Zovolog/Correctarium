import React from 'react';
import './Header.css'
export const Header: React.FC = (props) => {
  return (
    <div className='header'>
      <h1 className='logo'>Замовити переклад або редагування</h1>
      <button className='close'></button>
    </div>
  );
}
