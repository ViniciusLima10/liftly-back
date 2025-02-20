import React from "react";
import Header from "../../components/HeaderAdm";
import Sidebar from "../../components/SideBarAdm";
import LotacaoGauge from "../../components/GuageChart";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import "./style.css";

const HomePageAdm = () => {
   const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <h2 className="titulo">Bem vindo Adm</h2>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Alunos Cadastrados</h3>
            <p>120</p>
          </div>
          <div className="card">
            <h3>Lotação Atual</h3>
            <LotacaoGauge />
          </div>
          <div className="card">
            <h3>Próximas Aulas</h3>
            <p>Yoga às 10h, Spinning às 15h</p>
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={() => navigate("/EditarAulas")}>Ajustar Aulas</button>
          <button className="btn" onClick={() => navigate("/LotacaoAdm")}>Atualizar Lotação</button>
          <button className="btn" onClick={() => navigate("/CadastroAluno")}>Cadastrar Aluno</button>
        </div>
      </div>
    </div>
  );
};

export default HomePageAdm;
