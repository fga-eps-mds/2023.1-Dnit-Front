import IconGov from '../assets/govIcon.png'
import ButtonContraste from '../assets/buttonContraste.png'

export default function Header (){
    return (
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
    )
}

