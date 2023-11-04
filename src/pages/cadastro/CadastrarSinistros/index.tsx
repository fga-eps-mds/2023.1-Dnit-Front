import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../../components/Header";
import CadAcidentes from "../../../components/cadastrarSinistros/RegistrarSinistros";
import AcidentesAceito from "../../../components/cadastrarSinistros/validacao/SinistrosAceito";
import Acidentes_erro1 from "../../../components/cadastrarSinistros/validacao/SinistrosErro";
import "../../../styles/App.css";
import Footer from "../../../components/Footer";
import { Permissao } from "../../../models/auth";
import { AuthContext } from "../../../provider/Autenticacao";

function CadastrarSinistros() {
  const [screen, setScreen] = useState<"sc1" | "sc2" | "sc3">("sc1");
  const returnPage = useNavigate();

  const { temPermissao } = useContext(AuthContext);

  useEffect(() => {
    if (!temPermissao(Permissao.SinistroCadastrar)) {
      returnPage("/");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Secao2">
        <div className="box">
          <div className="formrs">
            {screen === "sc1" && (
              <CadAcidentes
                onClickBack={() => returnPage("/dashboard")}
                onClickError={() => setScreen("sc2")}
                onClickAceito={() => setScreen("sc3")}
              />
            )}

            {screen === "sc2" && (
              <Acidentes_erro1 onClickVoltar={() => setScreen("sc1")} />
            )}
            {screen === "sc3" && (
              <AcidentesAceito onClickVoltar={() => setScreen("sc1")} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CadastrarSinistros;
