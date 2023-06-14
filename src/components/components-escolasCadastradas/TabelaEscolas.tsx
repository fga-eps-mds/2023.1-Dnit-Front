import "../../styles/App.css";
import "../components-escolasCadastradas/TabelaEscolas.css";

export default function TabelaEscolas(){
    return(
      
      <><div className="col-sm-8 col-lg-5">
        <div className="br-input">
          <label htmlFor="input-default">Nome</label>
          <input id="input-default" type="text" placeholder="Placeholder" />
          <p>Digite o nome da escola</p>
        </div>
      </div><><div className="br-select">
        <div className="br-input">
          <label htmlFor="select-simple">UF</label>
          <input id="select-simple" type="text" placeholder="Selecione o item" />
          <button className="br-button" type="button" aria-label="Exibir lista" data-trigger="data-trigger"><i className="fas fa-angle-down" aria-hidden="true"></i>
          </button>
        </div>
        <div className="br-list">
          <div className="br-item">
            <div className="br-radio">
              <input id="rb0" type="radio" name="estados-simples" value="rb0" />
              <label htmlFor="rb0">Acre</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb1" type="radio" name="estados-simples" value="rb1" />
              <label htmlFor="rb1">Alagoas</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb2" type="radio" name="estados-simples" value="rb2" />
              <label htmlFor="rb2">Amapá</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb3" type="radio" name="estados-simples" value="rb3" />
              <label htmlFor="rb3">Amazonas</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb4" type="radio" name="estados-simples" value="rb4" />
              <label htmlFor="rb4">Bahia</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb5" type="radio" name="estados-simples" value="rb5" />
              <label htmlFor="rb5">Ceará</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb6" type="radio" name="estados-simples" value="rb6" />
              <label htmlFor="rb6">Distrito Federal</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb7" type="radio" name="estados-simples" value="rb7" />
              <label htmlFor="rb7">Espírito Santo</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb8" type="radio" name="estados-simples" value="rb8" />
              <label htmlFor="rb8">Goiás</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb9" type="radio" name="estados-simples" value="rb9" />
              <label htmlFor="rb9">Maranhão</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb10" type="radio" name="estados-simples" value="rb10" />
              <label htmlFor="rb10">Mato Grosso</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb11" type="radio" name="estados-simples" value="rb11" />
              <label htmlFor="rb11">Mato Grosso do Sul</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb12" type="radio" name="estados-simples" value="rb12" />
              <label htmlFor="rb12">Minas Gerais</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb13" type="radio" name="estados-simples" value="rb13" />
              <label htmlFor="rb13">Pará</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb14" type="radio" name="estados-simples" value="rb14" />
              <label htmlFor="rb14">Paraíba</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb15" type="radio" name="estados-simples" value="rb15" />
              <label htmlFor="rb15">Paraná</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb16" type="radio" name="estados-simples" value="rb16" />
              <label htmlFor="rb16">Pernambuco</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb17" type="radio" name="estados-simples" value="rb17" />
              <label htmlFor="rb17">Piauí</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb18" type="radio" name="estados-simples" value="rb18" />
              <label htmlFor="rb18">Rio de Janeiro</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb19" type="radio" name="estados-simples" value="rb19" />
              <label htmlFor="rb19">Rio Grande do Norte</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb20" type="radio" name="estados-simples" value="rb20" />
              <label htmlFor="rb20">Rio Grande do Sul</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb21" type="radio" name="estados-simples" value="rb21" />
              <label htmlFor="rb21">Rondônia</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb22" type="radio" name="estados-simples" value="rb22" />
              <label htmlFor="rb22">Santa Catarina</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb23" type="radio" name="estados-simples" value="rb23" />
              <label htmlFor="rb23">São Paulo</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb24" type="radio" name="estados-simples" value="rb24" />
              <label htmlFor="rb24">Sergipe</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb25" type="radio" name="estados-simples" value="rb25" />
              <label htmlFor="rb25">Tocantins</label>
            </div>
          </div>
          <div className="br-item">
            <div className="br-radio">
              <input id="rb27" type="radio" name="estados-simples" value="rb27" />
              <label htmlFor="rb27">Exterior</label>
            </div>
          </div>
        </div>
      </div><span className="feedback warning" role="alert"><i className="fas fa-exclamation-triangle" aria-hidden="true"></i>Texto auxiliar Função de prevenir erros.</span></></>

    );
}