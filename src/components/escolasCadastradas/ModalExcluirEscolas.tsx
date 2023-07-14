import { notification } from "antd";
import { useFiltroTabela } from "../../context/FiltroTabela";
import fetchExcluirEscola from "../../service/excluirEscola";
import "../estilo/ModalExcluirEscolas.css";

interface ModalExcluirEscolaProps {
  open: boolean;
  id: number;
  close: () => void;
  closeModalExcluirEscola: () => void;
  nomeEscola: string;
}

const ModalExcluirEscolas = ({
  open,
  id,
  close,
  closeModalExcluirEscola,
  nomeEscola,
}: ModalExcluirEscolaProps) => {
  const { fetchEscolasFiltradas } = useFiltroTabela();
  const excluirEscola = async () => {
    try {
      await fetchExcluirEscola({ id_escola: id });
      notification.success({
        message: `Escola ${nomeEscola} excluída com sucesso!`,
      });
      close();
      fetchEscolasFiltradas();
    } catch (error) {
      notification.error({
        message: `Erro ao excluir a escola ${nomeEscola}! `,
      });
      close();
    }
  };
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="overlay-modal">
        <div
          style={{
            zIndex: 10000,
            position: "absolute",
            top: "31%",
            left: "31%",
            right: "31%",
          }}
        >
          <div
            className="div br-modal large"
            style={{ width: "80%", height: "220px" }}
          >
            <div className="br-modal-header content-left">
              Confirmar Exclusão
            </div>
            <div className="modal-line"></div>
            <p className="space-p">
              Deseja excluir a escola permanentemende? A ação não pode ser
              desfeita.
            </p>
            <div className="br-modal-footer content-right">
              <button
                className="br-button secondary"
                type="button"
                onClick={closeModalExcluirEscola}
              >
                Voltar
              </button>
              <button
                className="br-button cancel-button"
                type="button"
                onClick={excluirEscola}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalExcluirEscolas;
