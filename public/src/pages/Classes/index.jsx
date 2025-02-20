import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./style.css";

const ClassesAluno = () => {
  const [agendamentos, setAgendamentos] = useState({});
  const [aulas, setAulas] = useState([
    { id: 1, nome: "Yoga", horario: "08:00", instrutor: "Maria", vagas: 10 },
    { id: 2, nome: "Pilates", horario: "09:30", instrutor: "João", vagas: 5 },
    { id: 3, nome: "Spinning", horario: "11:00", instrutor: "Carlos", vagas: 3 },
    { id: 4, nome: "Musculação", horario: "14:00", instrutor: "Ana", vagas: 7 },
    { id: 5, nome: "Crossfit", horario: "16:30", instrutor: "Pedro", vagas: 4 },
  ]);

  // Função para alternar entre agendar e cancelar
  const toggleAgendamento = (id) => {
    setAulas((prevAulas) =>
      prevAulas.map((aula) => {
        if (aula.id === id) {
          return {
            ...aula,
            vagas: agendamentos[id] ? aula.vagas + 1 : aula.vagas - 1, // Aumenta ou reduz a vaga
          };
        }
        return aula;
      })
    );

    setAgendamentos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <h2>Aulas Disponíveis</h2>

        {/* Verifica se há aulas disponíveis */}
        {aulas.length === 0 ? (
          <p className="mensagem-erro">Não há aulas disponíveis no momento.</p>
        ) : (
          <div className="aulas-container">
            <div className="aulas-header">
              <span>Nome da Aula</span>
              <span>Horário</span>
              <span>Instrutor</span>
              <span>Vagas Restantes</span>
              <span></span>
            </div>

            {aulas.map((aula) => (
              <div className="aula-item" key={aula.id}>
                <div className="aula-nome">{aula.nome}</div>
                <div className="aula-horario">{aula.horario}</div>
                <div className="aula-instrutor">{aula.instrutor}</div>
                <div className="aula-vagas">{aula.vagas} vagas</div>
                <button
                  className={`agendar-btn ${agendamentos[aula.id] ? "cancelar" : ""}`}
                  onClick={() => toggleAgendamento(aula.id)}
                  disabled={aula.vagas === 0 && !agendamentos[aula.id]} // Impede agendamento sem vagas
                >
                  {agendamentos[aula.id] ? "Cancelar" : "Agendar"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesAluno;
