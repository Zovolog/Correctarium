import React from 'react';
import './Footer.css'
import logo from './footer_logo.png'

export const Footer: React.FC = () => {
  return (
    <div className='wrap-footer'>
      <div className='container-footer'>
        <ul>
          <li className='list-element link_offerta'><a href='https://correctarium.com/terms'>Договір публічної аферти</a></li>
          <li className='list-element'>@Correctarium</li>
          <li className='list-element'>2015-2023</li>
        </ul>
        <div>
          <img src={logo}/>
        </div>
        <ul>
          <li className='list-element'>Надіслати текст на переклад:</li>
          <li className='list-element'><a className='link_email' href='mailto:manager@correctarium.com'>manager@correctarium.com</a></li>
        </ul>
      </div>
    </div>
  );
}