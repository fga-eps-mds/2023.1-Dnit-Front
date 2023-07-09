import React from 'react'
import Header from '../components/Header'
import '../styles/App.css'
import Footer from '../components/components-escolasCadastradas/Footer';
import RegistrarRodovias from '../components/cadastrarRodovias/RegistrarRodovias';


function CadastrarRodovias() {
    return (
        <div className='App'>
            <Header />
            <div className='Secao2'>
                <RegistrarRodovias />
            </div>
            <Footer />
        </div>
    );
}

export default CadastrarRodovias;