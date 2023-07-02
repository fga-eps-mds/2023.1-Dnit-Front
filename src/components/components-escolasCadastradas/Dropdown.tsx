import { ChangeEvent } from "react";
import { useSelectedValue } from "../../context/Situation";
import { Situacao } from "../../models/service";

interface Dropdownprops{
  situacoes: Situacao[]
  onClick:(value:string)=>void;
  onClose:()=> void;
  descricao: string;
}
const Dropdown = ({situacoes, onClick, onClose, descricao}:Dropdownprops) => {
  const { setSelectedValue, selectedValue } = useSelectedValue();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    console.log(selectedValue);
    onClick(selectedValue);
    onClose();
  };
  
  return (
    <div className="br-list" tabIndex={0}>
      {situacoes && situacoes.filter(situacao=>situacao.descricao.toLowerCase().includes(selectedValue.toLowerCase())).map(situacao =>
      (<div className="br-item" tabIndex={-1} key={situacao.id}>
      <div className="br-radio"> 
        <input
          id={situacao.id.toString()}
          type="radio"
          name="estados-simples"
          value={selectedValue ? selectedValue : situacao.descricao}
          onChange={handleChange}
          checked={selectedValue ? !!selectedValue : situacao.descricao === descricao}
        />
        <label htmlFor= {situacao.id.toString()} >{situacao.descricao}</label>
      </div>
    </div>)
        )}
        {!selectedValue &&
        <div className="br-item" tabIndex={-1}>
        <div className="br-radio">
          <input
            id="rb4"
            type="radio"
            name="estados-simples"
            value="Remover Situação"
            onChange={handleChange}
          />
          <label htmlFor="rb4">Remover Situação</label>
        </div>
      </div>
        }
    </div>
  );
};

export default Dropdown;
