import '../components-escolasCadastradas/ModalExcluirEscolas.css';
import "../../styles/form.css";

export default function ModalExibirInformacoes() {

    var x = "labael/rotulo";
    return (
        <div className="div br-modal large">
            <div className="br-modal-header">Confirmar Exclusão
            </div>
            <div className='modal-line'>
                 
            </div>
            <p>
                Deseja excluir a escola permanentemende? A ação não pode ser desfeita.
            </p>

            <div className="br-modal-footer justify-content-center">    
                <button className="br-button secondary" type="button">Voltar
                </button>
                <button className="br-button primary ml-2" type="button">Excluir
                </button>
            </div>
        </div>
    );
}