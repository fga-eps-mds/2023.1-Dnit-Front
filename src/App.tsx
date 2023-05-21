import React from 'react';
import './App.css';
import LogoDNIT from './assets/logoDnit.png'
import CadastroForm from './components/FormularioCadastro';
import Header from './components/Header';



function App() {
  return (
    <div className="App">
      <Header/>
      <div className='Secao'>
        <div className='Lateral'>
          <img className= "logoDnit"src={LogoDNIT} alt="Logo DNIT" />
        </div>
        <div className='Central'>
          <CadastroForm/>
        </div>
      </div>
    </div>
  );
}

export default App;
