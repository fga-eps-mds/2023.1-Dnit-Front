import { ChangeEvent, useState } from "react";
import { useSelectedValue } from "../../context/Situation";
import fetchSituacao from "../../service/Situacao";
import { Situacao } from "../../models/service";

const Dropdown = (props: any) => {
  const { setSelectedValue } = useSelectedValue();
  const [situacoes, setSituacoes] = useState<Situacao[]>();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(Number(selectedValue));
    console.log(selectedValue);
    props.onClick(selectedValue);
    props.onClose();
  };
  const chamarSituacao = async() =>{
    const situacoes = await fetchSituacao()
    setSituacoes(situacoes);
  }
chamarSituacao();
  

  return (
    <div className="br-list" tabIndex={0}>
      {situacoes && situacoes.filter(situacao=>situacao.descricao.toLowerCase().includes(props.selectedValue.toLowerCase())).map(situacao =>
      (<div className="br-item" tabIndex={-1} key={situacao.id}>
      <div className="br-radio">
        <input
          id={situacao.id.toString()}
          type="radio"
          name="estados-simples"
          value={situacao.id.toString()}
          onChange={handleChange}
        />
        <label htmlFor= {situacao.id.toString()} >{situacao.descricao}</label>
      </div>
    </div>)
        )}
        {!props.selectedValue &&
        <div className="br-item" tabIndex={-1}>
        <div className="br-radio">
          <input
            id="rb4"
            type="radio"
            name="estados-simples"
            value="-1"
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
