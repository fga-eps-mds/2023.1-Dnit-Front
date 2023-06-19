import ModalExibirInformacoes from "../components/components-escolasCadastradas/ModalExibirInformacoes";
import "../styles/App.css";
import {SelectedValueProvider} from "../context/Situation";

export default function ExibirInformacoesEscola(props: any) {
  const {id} = props;
  return (
    <div className="App">
        <SelectedValueProvider>
        <ModalExibirInformacoes id = {id} />  
        </SelectedValueProvider>
    </div>
  );
}

