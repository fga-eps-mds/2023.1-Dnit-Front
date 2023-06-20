import '../components-escolasCadastradas/ModalExibirInformacoes.css';
import React, { useState } from "react";
import fetchInfoEscola from "../../service/listarInfoEscola";
import { Dropdown, notification } from 'antd';
import ModalBody from './ModalBody';
import { useSelectedValue } from '../../context/Situation';
import fetchchangeSituation from '../../service/changeSituation';
import ModalExcluirEscolas from "../components-escolasCadastradas/ModalExcluirEscolas";
import fetchDeleteSituation from "../../service/deleteSituation";

    
const ModalExibirInformacoes = (props: any) => {
  const {id} = props.id;
  console.log({props});
  const [isModalExibirInformacoesOpen, setIsModalExibirInformacoesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [escolaData, setEscolaData] = useState({});
  const [isModalExcluirEscolasOpen, setIsModalExcluirEscolasOpen] = useState(false);

  var result = {};

  const openModal = async () => {
    try {
      result = await fetchInfoEscola({ id });
      setEscolaData(result);

    } catch (error) {
      console.log("error");
    }
    setIsModalExibirInformacoesOpen(true);
  };
  if(props.open ){
    openModal();
  }
 
  //const { selectedValue, setSelectedValue } = useSelectedValue();
  //const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {

    // if (selectedValue == -1){
    //     console.log("Received values of form: ", selectedValue);
    //     const excluirsituacaoData = {
    //       idEscola: id
    //     };
   
    //      try {
    //       await fetchDeleteSituation(excluirsituacaoData);
    //     } catch (error) {
    //       api.error({ message: `Erro ao salvar situação` });
    //     };
    // }
    
    // else {
    //   console.log("Received values of form: ", selectedValue);
    //   const salvarsituacaoData = {
    //     idEscola: id,
    //     idSituacao:selectedValue
    //   };
  
    //    try {
    //     await fetchchangeSituation(salvarsituacaoData);
    //   } catch (error) {
    //     api.error({ message: `Erro ao salvar situação` });
    //   } 
    // };
  }

  const openDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  if(!props.open) {return null} 
  return (
    <>    
        <div className="modal">
          <div className="modal-content">
            <div>
              <div className="container">
                <div className="div br-modal large">
                 <div className="br-modal-header">{props.nomeEscola}
                  </div>
                  <ModalBody data = {escolaData} open={isModalExibirInformacoesOpen} />
                  <ModalExcluirEscolas open={isModalExcluirEscolasOpen} id={props.id} close={() => setIsModalExcluirEscolasOpen(false)} /> 
                  <div className="br-modal-footer ">
                    <div className="content-left" style={{marginRight: "25%"}}>
                      <button className=" br-button cancel-button"  type="button" onClick={() => setIsModalExcluirEscolasOpen(true)}>Excluir escola
                      </button>
                    </div>
                    <div className='content-right'>
                      <button className="br-button secondary" type="button" onClick={props.close}>Cancelar
                      </button>
                      <button className="br-button primary ml-2 " type="button" onClick={onFinish}>Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ModalExibirInformacoes;