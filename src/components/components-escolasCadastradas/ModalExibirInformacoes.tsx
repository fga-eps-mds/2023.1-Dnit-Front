import '../components-escolasCadastradas/ModalExibirInformacoes.css';

export default function ModalExibirInformacoes() {

    return (

        <div className="div br-modal large">
            <div className="br-modal-header">Nome da Escola
            </div>
            <div className="br-modal-body">
                <div className="br-input input-inline">
                    <div className="input-label">
                    </div>
                    <div className="input-content">
                        <div className="input-group">
                            <div className="input-icon"><i className="fas fa-edit" aria-hidden="true"></i>
                            </div>
                            <input id="lateral-icon" type="text" placeholder="Placeholder" />
                        </div>
                    </div>
                </div>

                <div className="br-input">
                    <label htmlFor="input-default">Label / Rótulo</label>
                </div>
                <div className="br-input">
                    <label htmlFor="input-default">Label / Rótulo</label>
                    <input id="input-default" type="text" placeholder="Placeholder" />
                </div>
                <div className="br-input">
                    <label htmlFor="input-default">Label / Rótulo</label>
                    <input id="input-default" type="text" placeholder="Placeholder" />
                </div>

            </div>
            <div className="br-modal-footer justify-content-center">
                <button className="br-button secondary" type="button">Negar
                </button>
                <button className="br-button primary ml-2" type="button">Aceitar
                </button>
            </div>
        </div>
    );
}