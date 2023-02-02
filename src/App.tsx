import React from 'react';
import './App.css';
import { Footer } from './Components/Footer/Footer';
import Form from './Components/Form/Form';
import { Header } from './Components/Header/Header';
//Front Neutro
function App() {
  return (
    <div>
    <div className='main-content'>
    <Header/>
    <Form/>
    </div>
    <Footer/>
    </div>
  );
}


export default App;
