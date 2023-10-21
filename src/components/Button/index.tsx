import React, { ButtonHTMLAttributes, ReactElement, ReactNode, useState } from "react";
import "./Style.css"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icone?: string; 
  rotulo: string; //nao usado
  superficie?: string; //nao usado
  background?: 'p-3' | 'p-3 bg-gray-60'; //usado
  tipo?: 'primary' | 'secondary' | 'none' //usado
  variante?: 'default' | 'circular' | 'block'; //usado
  densidade?: 'large' | 'normal' | 'small'; //nao usado
  disabled?: boolean;
  click?: () => void;
}

export const ButtonComponent = (props: IButtonProps) => {
  const { variante } = props;
  switch (variante) {
    case 'default':
      return <DefaultButton {...props} />
    case 'circular':
      return <CircularButton {...props} />
    case 'block':
      return <BlockButton {...props} />
    default:
      return <DefaultButton {...props} />
  }
}

const DefaultButton = (props: IButtonProps) => {

  const [disabled, setDisabled] = useState(true);

  const toggleButton = () => {
    setDisabled(!disabled);
  };

  let { children, icone, rotulo, superficie, background, tipo, densidade, variante, click } = props;

  const esquemaCores = (background === "p-3 bg-gray-60" ? "dark-mode" : "") + (tipo !== "none" ? ` ${tipo} mb-3` : ""); //define se o fundo será cinza ou branco, e se o tipo do botão é primário, secundário ou nenhum (none)

  const cor_icone: boolean = background === 'p-3 bg-gray-60' && tipo === 'primary' || background === 'p-3' && tipo === 'primary'; //verifica por meio de expressão lógica qual deve ser a cor do ícone

  return (
    <button
      {...props}
      className={`br-button ${background} ${esquemaCores}`}
      type="button"
      aria-label="Ícone ilustrativo"
      onClick={toggleButton}
    >
      {disabled ?
        <i className={icone} style={{ color: cor_icone === true ? "white" : "" }} aria-hidden="true" color="white" ></i>
        :
        <button className="br-button primary loading" type="button" 
          style={{color: cor_icone === true ? "white" : ""  ,background: "0%" }}
        >Carregando
        </button>
      }
    </button>

  )
};

const CircularButton = (props: IButtonProps) => {
  const [disabled, setDisabled] = useState(true);
  const toggleButton = () => {
    setDisabled(!disabled);
  };

  let { icone, rotulo, superficie, background, tipo, densidade, variante, click } = props;

  const esquemaCores = (background === "p-3 bg-gray-60" ? "dark-mode" : "") + (tipo !== "none" ? ` ${tipo} mb-3` : "");

  const cor_icone: boolean = background === 'p-3 bg-gray-60' && tipo === 'primary' || background === 'p-3' && tipo === 'primary';

  return (
    <button
      {...props}
      className={`br-button circle ${background} ${esquemaCores}`}
      type="button"
      onClick={toggleButton}
      aria-label="Ícone ilustrativo"
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {disabled ?
        <i className={icone} style={{ color: cor_icone === true ? "white" : "" }} aria-hidden="true"></i>
        :
        <button className="br-button primary loading" type="button"
          style={{color: cor_icone === true ? "white" : "", background: "0%" }}></button>
      }

    </button>
  )
}

const BlockButton = (props: IButtonProps) => {
  const [disabled, setDisabled] = useState(true);
  const toggleButton = () => {
    setDisabled(!disabled);
  };
  let { children, icone, rotulo, superficie, background, tipo, densidade, variante, click } = props;

  const esquemaCores = (background === "p-3 bg-gray-60" ? "dark-mode" : "") + (tipo !== "none" ? ` ${tipo} mb-3` : "");

  return (
    <button
      className={`br-button block ${esquemaCores}`}
      type="button"
      onClick={toggleButton}
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {disabled ? children :
        <button className="br-button primary loading" type="button"
          style={{ background: "0%" }}
        >Carregando
        </button>
      }
    </button>
  )

}