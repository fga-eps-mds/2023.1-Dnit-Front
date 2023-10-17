import ModalExibirInformacoes from "../../../../components/escolasCadastradas/modal/ModalInformacoes";
import "../../../../styles/App.css";
import { SelectedValueProvider } from "../../../../context/Situacao";

export default function Informacoes(props: any) {
  const {  escola, open, close } = props;
  return (
    <div>
      <SelectedValueProvider>
        <ModalExibirInformacoes escola={escola} open={open} close={close} />
      </SelectedValueProvider>
    </div>
  );
}

