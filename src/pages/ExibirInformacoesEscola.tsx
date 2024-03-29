import ModalExibirInformacoes from "../components/escolasCadastradas/ModalExibirInformacoes";
import "../styles/App.css";
import { SelectedValueProvider } from "../context/Situacao";

export default function ExibirInformacoesEscola(props: any) {
  const {  escola, open, close } = props;
  return (
    <div>
      <SelectedValueProvider>
        <ModalExibirInformacoes escola={escola} open={open} close={close} />
      </SelectedValueProvider>
    </div>
  );
}

