import "../styles/App.css";
import logoDnit from "../assets/logoDnit.png";
import "./estilo/Footer.css";

interface FooterProps {
  home?:boolean;
}

export default function Footer({ home } : FooterProps){
    return (
        <footer className="br-footer">
          <div className="container-lg">
            <div className="logo text-sm-left"><img src={logoDnit} alt="Imagem"/></div>
            { home ? (
              null
            ) : 
            <div className="br-list horizontal" data-toggle="data-toggle" data-sub="data-sub">
              <div className="col-2"><a className="br-item header" >
                  <div className="content text-down-01 text-bold text-uppercase">Início</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item">
                    <div className="content">Login de Usuário</div></a><a className="br-item">
                    <div className="content">Cadastro de Usuário</div></a><a className="br-item">
                    <div className="content">Esqueci Minha Senha</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" >
                  <div className="content text-down-01 text-bold text-uppercase">Dashboard</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item">
                    <div className="content">Solicitar Ação</div></a><a className="br-item">
                    <div className="content">Visualizar UPS</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" >
                  <div className="content text-down-01 text-bold text-uppercase">Escolas</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item">
                    <div className="content">Visualizar Escolas</div></a><a className="br-item">
                    <div className="content">Cadastro de Escolas</div></a><a className="br-item">
                    <div className="content">Cadastro Manual</div></a><a className="br-item">
                    <div className="content">Cadastro por Planilha</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" >
                  <div className="content text-down-01 text-bold text-uppercase">Inserção de Dados</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item">
                    <div className="content">Inserir Dados de Acidente</div></a><a className="br-item">
                    <div className="content">Inserir Dados de Rodovias</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
            </div> }
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
          </div><span className="br-divider my-3"></span>
          <div className="container-lg">
            <div className="info">
              <div className="text-down-01 text-medium pb-3">Texto destinado a exibição de informações relacionadas à&nbsp;<strong>licença de uso.</strong></div>
            </div>
          </div>
        </footer>
        );
}