import { useState } from "react";
import { notification } from "antd";
import "./Styles.css";


export interface SelectProps {
  items: string[];
  value?: string; //Valor selecionado atualmente
  label?: string; //Titulo do dropdown
  inputStyle?: object;
  dropdownStyle?: object;
  buttonStyle?: object
  onChange: (value: string) => void;
}

export default function Select({ items, value, label, onChange, inputStyle, dropdownStyle, buttonStyle }: SelectProps) {
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
    <div className="profile-type-select br-select" style={{ flexBasis: "90%" }}>
      <div className="br-input ">
        <label className="profile-type-label ml-2" htmlFor="select-simple" ><p style={{marginBottom:"4px"}}><strong>{label}</strong></p></label>
        <div className="br-input large input-button">
          <input id="select-simple" type="text" placeholder="Selecione o item" value={value} readOnly style={inputStyle}/>
          <button className="br-button" type="button" aria-label="Exibir lista" tabIndex={-1} data-trigger="data-trigger" onClick={toggleDropdown} style={buttonStyle}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      {isOpen && 
      <div className="br-list2" style={dropdownStyle} tabIndex={0}>
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
