import { ChangeEvent } from "react";
import { useSelectedValue } from "../../context/Situation";

const Dropdown = (props: any) => {
  const { selectedValue, setSelectedValue } = useSelectedValue();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(Number(selectedValue));
  };

  return (
    <div className="br-list" tabIndex={0}>
      <div className="br-item" tabIndex={-1}>
        <div className="br-radio">
          <input
            id="rb0"
            type="radio"
            name="estados-simples"
            value="1"
            onChange={handleChange}
          />
          <label htmlFor="rb0">Indicação</label>
        </div>
      </div>
      <div className="br-item" tabIndex={-1}>
        <div className="br-radio">
          <input
            id="rb1"
            type="radio"
            name="estados-simples"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="rb1">Solicitação da escola</label>
        </div>
      </div>
      <div className="br-item" tabIndex={-1}>
        <div className="br-radio">
          <input
            id="rb2"
            type="radio"
            name="estados-simples"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="rb2">Jornada de crescimento do professor</label>
        </div>
      </div>
      <div className="br-item" tabIndex={-1}>
        <div className="br-radio">
          <input
            id="rb3"
            type="radio"
            name="estados-simples"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="rb3">Escola crítica</label>
        </div>
      </div>
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
    </div>
  );
};

export default Dropdown;
