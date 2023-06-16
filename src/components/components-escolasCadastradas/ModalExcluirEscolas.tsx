import './ModalExcluirEscolas.css';
export default function ModalExibirInformacoes() {

    var x = "labael/rotulo";
    return (
        <div className="div br-modal large">
            <div className="br-modal-header content-left">Confirmar Exclusão 
            </div>
            <div className='modal-line'>
                 
            </div>
            
            <p className='content-left space-p'>
                Deseja excluir a escola permanentemende? A ação não pode ser desfeita.
            </p>

            <div className="br-modal-footer content-right">    
                <button className="br-button secondary" type="button">Voltar
                </button>
                <button className="br-button cancel-button" type="button">Excluir
                </button>
            </div>
        </div>
    );
}