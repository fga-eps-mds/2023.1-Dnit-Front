import { notification } from 'antd';
import fetchExcluirEscola from '../../service/excluirEscola';
import './ModalExcluirEscolas.css';
import { useState } from 'react';



const ModalExcluirEscolas = (props: any) => {

    const excluirEscola = async () => {
        const nomeEscola = props.nomeEscola;
        try {
            await fetchExcluirEscola({ id_escola: props.id });
            notification.success({ message: `Escola ${nomeEscola} excluída com sucesso!` });
            props.close();
        } catch (error) {
            notification.error({ message: `Erro ao excluir a escola ${nomeEscola}! ` });
            props.close();
        }

    }
    if (!props.open) { return null }
    return (
        < >
            <div className='overlay-modal'>
                <div style={{ zIndex: 10000, position: 'absolute', top: '31%', left: '31%', right: '31%' }}>
                    <div className="div br-modal large" style={{ width: '100%' }}>
                        <div className="br-modal-header content-left">Confirmar Exclusão
                        </div>
                        <div className='modal-line'>
                        </div>
                        <p className='content-left space-p'>
                            Deseja excluir a escola permanentemende? A ação não pode ser desfeita.
                        </p>
                        <div className="br-modal-footer content-right">
                            <button className="br-button secondary" type="button" onClick={props.close}>Voltar
                            </button>
                            <button className="br-button cancel-button" type="button" onClick={excluirEscola}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ModalExcluirEscolas;