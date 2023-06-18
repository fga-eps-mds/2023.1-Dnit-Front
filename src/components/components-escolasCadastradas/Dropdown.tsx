import React, { ChangeEvent, useState } from "react";
import { useSelectedValue } from "../../context/Situation";
//import fetchdeleteSituation from "../../service/deleteSituation";
//import { notification } from 'antd';
import axios from 'axios';


const Dropdown = (props: any) => {
 const { selectedValue, setSelectedValue } = useSelectedValue();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(Number(selectedValue));
  };

  // const [api] = notification.useNotification();
  // const deleteSituation = async () => {
  //   console.log("Received values of form: ", selectedValue);
  //   const excluirsituacaoData = {
  //     idEscola: props.id
  //   };

  //    try {
  //     await fetchdeleteSituation(excluirsituacaoData);
  //   } catch (error) {
  //     api.error({ message: `Erro ao salvar situação` });
  //   } 
  // };

  const deleteSituation = async (values: any) =>{
    const excluirsituacaoData = {
      idEscola: props.id
    };
    try {
      await axios.put("Received values of form: ", excluirsituacaoData);
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  }

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
            value="0"
            onClick={deleteSituation}
            onChange={handleChange}
          />
          <label htmlFor="rb4">Remover Situacao</label>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
