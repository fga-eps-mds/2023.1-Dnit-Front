import "../../styles/App.css";
import logoDnit from "../../assets/logoDnit.png";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  home?: boolean;
}

export default function Footer(props: FooterProps) {
  const navigate = useNavigate();
  return (
    <footer className="br-footer" data-testid="footer">
      <div className={props.home ? "logo center-align" : "logo left-align"}>
        <img src={logoDnit} alt="Imagem" />
      </div>
      <div>
        {props.home ? null : (
          <div
            className="br-list horizontal"
            data-toggle="data-toggle"
            data-sub="data-sub"
          >
            <div className="col-2">
              <span
                className="br-item"
                data-testid="init-button"
                onClick={() => navigate("/")}
                onKeyDown={() => {}}
              >
                <div className="category-text">INÍCIO</div>
              </span>
              <div className="br-list">
                <span className="br-divider d-md-none"></span>
                <span className="br-item" onClick={() => navigate("/login")} onKeyDown={() => {}}>
                  <div className="category-content">Login de Usuário</div>
                </span>
                <span className="br-item" onClick={() => navigate("/cadastro")} onKeyDown={() => {}}>
                  <div className="category-content">Cadastro de Usuário</div>
                </span>
                <span
                  className="br-item"
                  onClick={() => navigate("/esqueciSenha")}
                  onKeyDown={() => {}}
                >
                  <div className="category-content">Esqueci Minha Senha</div>
                </span>
                <span className="br-divider d-md-none"></span>
              </div>
            </div>
            <div className="col-2">
              <span className="br-item" onClick={() => navigate("/dashboard")} onKeyDown={() => {}}>
                <div className="category-text">DASHBOARD</div>
              </span>
              <div className="br-list">
                <span className="br-divider d-md-none"></span>
                <span
                  className="br-item"
                  onClick={() => navigate("/solicitacaoAcao")}
                  onKeyDown={() => {}}
                >
                  <div className="category-content">Solicitar Ação</div>
                </span>
                <span className="br-item" onClick={() => navigate("/TelaUPS")} onKeyDown={() => {}}>
                  <div className="category-content">Visualizar UPS</div>
                </span>
                <span className="br-divider d-md-none"></span>
              </div>
            </div>
            <div className="col-2">
              <span className="br-item">
                <div className=" category-text">ESCOLAS</div>
              </span>
              <div className="br-list">
                <span className="br-divider d-md-none"></span>
                <span
                  className="br-item"
                  onClick={() => navigate("/escolas-cadastradas")}
                  onKeyDown={() => {}}
                >
                  <div className="category-content">Visualizar Escolas</div>
                </span>
                <span
                  className="br-item"
                  onClick={() => navigate("/cadastrarescola")}
                  onKeyDown={() => {}}
                >
                  <div className="category-content">Cadastro de Escolas</div>
                </span>
                <span className="br-divider d-md-none"></span>
              </div>
            </div>
            <div className="col-2">
              <span className="br-item ">
                <div className=" category-text">INSERÇÃO DE DADOS</div>
              </span>
              <div className="br-list">
                <span className="br-divider d-md-none"></span>
                <span
                  className="br-item"
                  onClick={() => navigate("/cadastrarsinistros")}
                  onKeyDown={() => {}}
                >
                  <div className="category-content">
                    Inserir Dados de Acidente
                  </div>
                </span>
                <span
                  className="br-item"
                  onClick={() => navigate("/cadastrarRodovias")}
                  onKeyDown={() => {}}
                >
                  <div className="category-content">
                    Inserir Dados de Rodovias
                  </div>
                </span>
                <span className="br-divider d-md-none"></span>
              </div>
            </div>
          </div>
        )}
        {/* Redes Sociais */}
        {/* <div className="d-none d-sm-block">
              <div className="row align-items-end justify-content-between py-5">
                <div className="col">
                  <div className="social-network">
                    <div className="social-network-title">Redes Sociais</div>
                    <div className="d-flex"><a className="br-button circle" aria-label="Compartilhar por Facebook"><i className="fab fa-facebook-f" aria-hidden="true"></i></a><a className="br-button circle"  aria-label="Compartilhar por Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a><a className="br-button circle" aria-label="Compartilhar por Linkedin"><i className="fab fa-linkedin-in" aria-hidden="true"></i></a><a className="br-button circle" aria-label="Compartilhar por Whatsapp"><i className="fab fa-whatsapp" aria-hidden="true"></i></a></div>
                  </div>
                </div>
                <div className="col assigns text-right"><img className="ml-4" src="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-positive.png" alt="Imagem"/><img className="ml-4" src="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-positive.png" alt="Imagem"/>
                </div>
              </div>
            </div> */}
      </div>
      {/* <span className="br-divider my-3"></span>
          <div className="container-lg">
            <div className="info">
              <div className="text-down-01 text-medium pb-3">Texto destinado a exibição de informações relacionadas à&nbsp;<strong>licença de uso.</strong></div>
            </div>
          </div> */}
    </footer>
  );
}
