import React, { useState } from "react";
import Header from "../../components/HeaderAdm";
import Sidebar from "../../components/SideBarAdm";
import LotacaoGauge from "../../components/GuageChart";
import "./style.css";

const LotacaoAdm = () => {
  const [lotacao, setLotacao] = useState("");

  const handleConfirmar = () => {
    if (lotacao) {
      localStorage.setItem("lotacao", lotacao);
      window.dispatchEvent(new Event("lotacaoAtualizada")); // Dispara um evento customizado
      alert("Lotação atualizada com sucesso!");
      setLotacao(""); // Reseta o input após salvar
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <h2>Lotação atual</h2>

        <div className="card">
          <h3>Lotação Atual</h3>
          <LotacaoGauge />

          <div className="form-group">
            <label>Digite a lotação que deseja:</label>
            <input
              type="number"
              placeholder="Lotação"
              value={lotacao}
              onChange={(e) => setLotacao(e.target.value)}
            />

            <button className="button" onClick={handleConfirmar}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotacaoAdm;
