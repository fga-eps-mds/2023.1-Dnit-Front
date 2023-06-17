const Dropdown = () => {
    return (
        <div className="br-list" tabIndex={0}>
            <div className="br-item" tabIndex={-1}>
                <div className="br-radio">
                    <input id="rb0" type="radio" name="estados-simples" value="rb0" />
                    <label htmlFor="rb0">Indicação</label>
                </div>
            </div>
            <div className="br-item" tabIndex={-1}>
                <div className="br-radio">
                    <input id="rb1" type="radio" name="estados-simples" value="rb1" />
                    <label htmlFor="rb1">Solicitação da escola</label>
                </div>
            </div>
            <div className="br-item" tabIndex={-1}>
                <div className="br-radio">
                    <input id="rb2" type="radio" name="estados-simples" value="rb2" />
                    <label htmlFor="rb2">Jornada de crescimento do professor</label>
                </div>
            </div>
            <div className="br-item" tabIndex={-1}>
                <div className="br-radio">
                    <input id="rb3" type="radio" name="estados-simples" value="rb3" />
                    <label htmlFor="rb3">Escola crítica</label>
                </div>
            </div>
            <div className="br-item" tabIndex={-1}>
                <div className="br-radio">
                    <input id="rb4" type="radio" name="estados-simples" value="rb4" />
                    <label htmlFor="rb4">Remover Situacao</label>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;