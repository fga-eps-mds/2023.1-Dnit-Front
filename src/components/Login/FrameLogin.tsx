import React from 'react';
import './framelogin.css';
import '@fortawesome/fontawesome-free'
import ButtonComponent from './buttomComponent';


export function FrameLogin() {
    return (
        <div className='frame' style={{textAlign:'left'}}>
            <form className='box' action=''>
                <h1 className='title'>Login</h1>
                <p >
                    <i className="fas fa-envelope"></i>
                    <label className='fields-name'>Email</label>
                </p>
                <input type='text' className='input' required></input>
                <p>
                    <i className='fas fa-lock'></i>
                    <label className='fields-name'>Senha</label>
                </p>
                <input type='password' className='input'></input>
                <a className='label' href='/senha'>Esqueceu a senha?</a>
                <p>
                    <ButtonComponent cor='#FFFFFF' cor_borda='#1351B4' nome='Cadastrar-se' cor_letra='#1351B4' ></ButtonComponent>
                    <ButtonComponent cor='#1351B4' cor_borda='#1351B4' nome='Entrar' cor_letra='#FFFFFF'></ButtonComponent>
                </p>
            </form>
        </div>
    );
}