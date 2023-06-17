import ModalExibirInformacoes from "../components/components-escolasCadastradas/ModalExibirInformacoes";
import "../styles/App.css";
import {SelectedValueProvider} from "../context/Situation";

export default function ExibirInformacoesEscola() {
  return (
    <div className="App">
        <SelectedValueProvider>
        <ModalExibirInformacoes />  
        </SelectedValueProvider>
    </div>
  );
}

