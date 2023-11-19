interface FiltroNomeProps {
    nome?: string;
    onNomeChange: (nome: string) => void;
}

export function FiltroNome({ nome, onNomeChange }: FiltroNomeProps) {
    return (
        <div className="d-flex flex-column ml-3 mt-5 mb-5">
            <label className="ml-2" style={{ textAlign: 'start', fontSize: '16px' }}>Nome:</label>
            <div className="d-flex" style={{ fontSize: '16px' }}>
                <div className="br-input large input-button">
                    <input data-testid="filtroNome" className="br-input-search-large" type="search" placeholder="Nome" value={nome}
                        onChange={e => onNomeChange(e.target.value)}
                    />
                    <button className="br-button" type="button" aria-label="Buscar" onClick={() => { }}>
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}