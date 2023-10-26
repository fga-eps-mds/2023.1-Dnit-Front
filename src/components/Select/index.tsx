import { useState } from "react";
import { notification } from "antd";


export interface SelectProps {
  items: string[];
  value?: string; //Valor selecionado atualmente
  label?: string; //Titulo do dropdown
  onChange: (value: string) => void;
}

export default function Select({ items, value, label, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    // console.log('toggleDropdown foi chamada');
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    onChange(item);
    setIsOpen(false);
  };

  return(
    <div className="br-select" style={{ width: `${items.length * 20}px` }}>
      <div className="br-input">
        <label htmlFor="select-simple"><p><strong>{label}</strong></p></label>
        <input id="select-simple" type="text" placeholder="Selecione o item" value={value} readOnly/>
        <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger" onClick={toggleDropdown}>
          <i className="fas fa-angle-down" aria-hidden="true"></i>
        </button>
      </div>
      {isOpen && 
      <div className="br-list" tabIndex={0}>
        {items.map((item, index) => (
          <div key={index} className="br-item" tabIndex={-1} onClick={() => handleItemClick(item)}>
            <div className="br-radio">
              <input id={`rb${index}`} type="radio" name="estados-simples" value={item} checked={value === item} onChange={() => {}}/>
              <label htmlFor={`rb${index}`}>{item}</label>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  );





}