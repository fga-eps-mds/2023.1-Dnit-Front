import React from 'react';
import './App.css';
import IconGov from './assets/govIcon.png'
import ButtonContraste from './assets/buttonContraste.png'
import LogoDNIT from './assets/logoDnit.png'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="HeaderIcon">
          <img className="iconGov" src={IconGov} alt="ícone gov" />
          <p>DNIT</p>
        </div>
        <div className="HeaderContraste">
          <img className= "buttonContraste"src={ButtonContraste} alt="Button contraste" />
          <p>Alto contraste</p>
        </div>
      </header>
      <div className='Secao'>
        <div className='Lateral'>
          <img className= "logoDnit"src={LogoDNIT} alt="Logo DNIT" />
        </div>
        <div className='Central'></div>
      </div>
    </div>
  );
}

export default App;
