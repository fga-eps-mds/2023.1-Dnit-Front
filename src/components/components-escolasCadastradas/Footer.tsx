import "../../styles/App.css";
import logoDnit from "../../assets/logoDnit.png";
import "../components-escolasCadastradas/style/Footer.css";

export default function Footer(){
    return (
        <footer className="br-footer">
          <div className="container-lg">
            <div className="logo text-sm-left"><img src={logoDnit} alt="Imagem"/></div>
            <div className="br-list horizontal" data-toggle="data-toggle" data-sub="data-sub">
              <div className="col-2"><a className="br-item header" href="javascript:void(0)">
                  <div className="content text-down-01 text-bold text-uppercase">Categoria 1</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="javascript:void(0)">
                    <div className="content">Qui esse</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Nulla occaecat eiusmod</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Est ex deserunt</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" href="javascript:void(0)">
                  <div className="content text-down-01 text-bold text-uppercase">Categoria 2</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="javascript:void(0)">
                    <div className="content">Ad deserunt nostrud</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Nulla occaecat eiusmod</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" href="javascript:void(0)">
                  <div className="content text-down-01 text-bold text-uppercase">Categoria 3</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="javascript:void(0)">
                    <div className="content">Ex qui laborum consectetur aute commodo</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Ex qui laborum consectetur aute commodo</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" href="javascript:void(0)">
                  <div className="content text-down-01 text-bold text-uppercase">Categoria 4</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="javascript:void(0)">
                    <div className="content">Est ex deserunt</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Ad deserunt nostrud</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Est ex deserunt</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" href="javascript:void(0)">
                  <div className="content text-down-01 text-bold text-uppercase">Categoria 5</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="javascript:void(0)">
                    <div className="content">Adipisicing culpa et ad consequat</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Deserunt</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
              <div className="col-2"><a className="br-item header" href="javascript:void(0)">
                  <div className="content text-down-01 text-bold text-uppercase">Categoria 6</div>
                  <div className="support"><i className="fas fa-angle-down" aria-hidden="true"></i>
                  </div></a>
                <div className="br-list"><span className="br-divider d-md-none"></span><a className="br-item" href="javascript:void(0)">
                    <div className="content">Deserunt</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Est ex deserunt</div></a><a className="br-item" href="javascript:void(0)">
                    <div className="content">Nulla occaecat eiusmod</div></a><span className="br-divider d-md-none"></span>
                </div>
              </div>
            </div>
            <div className="d-none d-sm-block">
              <div className="row align-items-end justify-content-between py-5">
                <div className="col">
                  <div className="social-network">
                    <div className="social-network-title">Redes Sociais</div>
                    <div className="d-flex"><a className="br-button circle" href="javascript: void(0)" aria-label="Compartilhar por Facebook"><i className="fab fa-facebook-f" aria-hidden="true"></i></a><a className="br-button circle" href="javascript: void(0)" aria-label="Compartilhar por Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a><a className="br-button circle" href="javascript: void(0)" aria-label="Compartilhar por Linkedin"><i className="fab fa-linkedin-in" aria-hidden="true"></i></a><a className="br-button circle" href="javascript: void(0)" aria-label="Compartilhar por Whatsapp"><i className="fab fa-whatsapp" aria-hidden="true"></i></a></div>
                  </div>
                </div>
                <div className="col assigns text-right"><img className="ml-4" src="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-positive.png" alt="Imagem"/><img className="ml-4" src="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-positive.png" alt="Imagem"/>
                </div>
              </div>
            </div>
          </div><span className="br-divider my-3"></span>
          <div className="container-lg">
            <div className="info">
              <div className="text-down-01 text-medium pb-3">Texto destinado a exibição de informações relacionadas à&nbsp;<strong>licença de uso.</strong></div>
            </div>
          </div>
        </footer>
        );
}