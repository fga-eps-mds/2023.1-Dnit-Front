import { Button, Col, Image, Row } from "antd";
import { useNavigate } from "react-router";
import Galera from "../assets/galera.png";
import Galera2 from "../assets/galera2.png";
import Header from "../components/Cabecalho";
import Footer from "../components/Rodape";
import "../styles/App.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header login={true} />

      <Row justify={"start"} className="image-home-row">
        <Image src={Galera} preview={false} className="image-home" />
      </Row>

      <Row justify={"space-around"} className="container-home">
        <Col md={15} className="col-home">
          <p className="text">
            O DNIT defende que se aprende brincando. Por isso, criamos a Galera
            do DNIT, um projeto de Educação para o Trânsito do Departamento
            Nacional de Infraestrutura de Transportes (DNIT) que usa
            brincadeiras para falar de um assunto muito sério: o trânsito.
          </p>
          <p className="text">
            {" "}
            O Brasil aparece em quinto lugar entre os países recordistas em
            mortes no trânsito. Segundo a Organização Mundial da Saúde, as
            lesões ocorridas no trânsito são a principal causa de morte entre
            crianças e jovens de 5 a 29 anos. Todos os dias, 3 crianças perdem a
            vida no trânsito brasileiro.
          </p>
          <p className="text">
            {" "}
            O DNIT é uma autarquia federal vinculada ao Ministério dos
            Transportes com o dever prioritário de promover a educação para o
            trânsito e garantir que as pessoas possam circular em segurança
            pelas rodovias brasileiras.
          </p>
        </Col>
        <Col md={4}>
          <Image src={Galera2} preview={false} />
        </Col>
        <Row justify={"center"} className="row-text">
          <Col md={22} className="col-home">
            <p className="text">
              {" "}
              Reconhecendo que, para além de futuros condutores, as crianças e
              jovens são usuários do trânsito hoje, como pedestres, ciclistas e
              passageiras, a Galera do DNIT busca abordar cuidados básicos a
              serem adotados no trânsito. Assim, realizamos percursos temáticos,
              jogo de tabuleiro, passa-ou-repassa, jogo de mímica, gincanas,
              vídeos educativos e muitas outras brincadeiras para falar dos
              riscos do trânsito de uma forma leve. Reconhecendo também que é
              preciso uma mudança cultural para alcançarmos paz no trânsito, e
              entendendo a educação como um processo d e longo prazo, o Projeto
              também busca sensibilizar a comunidade escolar sobre a importância
              de educar nossas crianças sobre os riscos do trânsito p ara que se
              mobilizem e atuem de forma continuada.{" "}
            </p>

            <p className="text">
              Enquanto as crianças brincam com nossos monitores, os professores
              e gestores escolares são convidados a refletir sobre a importância
              de um trânsito seguro e como a escola pode dar continuidade às
              ações educativas em sala de aula, por meio do Programa Conexão
              DNIT.
            </p>

            <p className="text">
              A Galera do DNIT percorre as rodovias federais brasileiras
              priorizando escolas em situação de risco, com registro de sinistro
              s de trânsito no entorno escolar. Também visitamos escolas
              participantes do Programa Conexão DNIT que tiveram um bom
              desempenho, como uma forma de reconhecimen to ao trabalho
              constante por um trânsito melhor.
            </p>

            <p className="text">
              <b>
                Também acha a educação para o trânsito importante e tem vontade
                de modificar a realidade das vias e rodovias do Brasil? Solicite
                uma ação da Galera do DNIT na sua escola.
              </b>
            </p>
          </Col>
        </Row>
        <Row className="container-link">
          <Link
            to='https://servicos.dnit.gov.br/conexao'
            target={"_blank"}
            className="link"
          >Conheça outros projetos do DNIT!</Link>
        </Row>
      </Row>

      <Button
        className="botao-acao"
        onClick={() => navigate("/solicitacaoAcao")}
      >
        <p className="text-acao">SOLICITE UMA AÇÃO</p>
      </Button>
      <Footer />
    </div>
  );
}
