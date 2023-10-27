import { useEffect, useState } from "react";
import { notification } from "antd";
import "./Styles.css";

interface SelectOptions {
  id: number;
  rotulo: string;
}
export interface SelectProps {
  items: {id: number, rotulo: string}[];
  value?: number; //Valor selecionado atualmente
  label?: string; //Titulo do dropdown
  inputStyle?: object;
  dropdownStyle?: object;
  buttonStyle?: object
  onChange: (id: number) => void;
}

export default function Select({ items, value, label, onChange, inputStyle, dropdownStyle, buttonStyle }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [novaLista, setNovaLista] = useState<SelectOptions[]>([]);

  const toggleDropdown = () => {
    // console.log('toggleDropdown foi chamada');
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: number) => {
    onChange(item);
    setIsOpen(false);
  };

  const getRotuloById = (id: number | undefined, items: { id: number, rotulo: string }[]): string => {
    const item = items.find(item => item.id === id);
    return item ? item.rotulo : '';
  };

  useEffect(() => {
    const concatLista = [{id: 0, rotulo: "Todos"}].concat(items);
    //console.log({novaLista});
    
    setNovaLista(concatLista);
  }, [items])

  //getRotuloById(value, novaLista)
  
  return(
    <div className="profile-type-select br-select" style={{ flexBasis: "90%" }}>
      <div className="br-input ">
        <label className="profile-type-label ml-2" htmlFor="select-simple" ><p style={{marginBottom:"4px"}}><strong>{label}</strong></p></label>
        <div className="br-input large input-button">
          <input id="select-simple" type="text" placeholder="Todos" value={getRotuloById(value, novaLista)} readOnly style={inputStyle}/>
          <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger" onClick={toggleDropdown} style={buttonStyle}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      {isOpen && 
      <div className="br-list2" style={dropdownStyle} tabIndex={0}>
        {novaLista.map((item, index) => (
          <div key={index} className="br-item" tabIndex={-1} onClick={() => handleItemClick(item.id)}>
            <div className="br-radio">
              <input id={`rb${index}`} type="radio" name="estados-simples" value={item.rotulo} checked={value === item.id} onChange={() => {}}/>
              <label htmlFor={`rb${index}`}>{item.rotulo}</label>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  );
}
