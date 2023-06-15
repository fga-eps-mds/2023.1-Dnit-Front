import '../components-escolasCadastradas/ModalExibirInformacoes.css';

export default function ModalExibirInformacoes() {

    var x = "labael/rotulo";
    return (
        <div className="div br-modal large">
            <div className="br-modal-header">Nome da Escola
            </div>
            <div className="br-modal-body">
                <div className="br-input">
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/> 
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/> 
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/> 
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder" disabled/>
                    <label htmlFor="input-default">{x}</label>
                    <input id="input-default" type="text" placeholder="Placeholder"/>
                    <div className="br-select">
                    <div className="br-input">
                        <label htmlFor="select-simple">Label</label>
                        <input id="select-simple" type="text" placeholder="Selecione o item"/>
                        <button className="br-button" type="button" aria-label="Exibir lista"  data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="br-list" >
                        <div className="br-item" >
                        <div className="br-radio">
                            <input id="rb0" type="radio" name="estados-simples" value="rb0"/>
                            <label htmlFor="rb0">Acre</label>
                        </div>
                        </div>
                        <div className="br-item" >
                        <div className="br-radio">
                            <input id="rb1" type="radio" name="estados-simples" value="rb1"/>
                            <label htmlFor="rb1">Alagoas</label>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="br-modal-footer justify-content-center">
                <button className="br-button secondary" type="button">Negar
                </button>
                <button className="br-button primary ml-2" type="button">Aceitar
                </button>
            </div>
        </div>
        </div>
    );
}
