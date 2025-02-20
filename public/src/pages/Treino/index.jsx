import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./style.css";

const TreinoPage = () => {
  const [exercicios, setExercicios] = useState([]);

  // Garante que os exercícios sejam carregados ao montar o componente
  useEffect(() => {
    setExercicios([
      { nome: "Supino", repeticoes: "3x10", observacoes: "Carga moderada" },
      { nome: "Agachamento", repeticoes: "4x12", observacoes: "Atenção à postura" }
    ]);
  }, []);

  // Verifica se os dados estão carregando corretamente
  console.log("Lista de exercícios:", exercicios);

  const [editando, setEditando] = useState(false);

  const toggleEdicao = () => {
    setEditando(!editando);
  };

  const adicionarExercicio = () => {
    setExercicios([...exercicios, { nome: "", repeticoes: "", observacoes: "" }]);
  };

  const removerExercicio = (index) => {
    const novoArray = exercicios.filter((_, i) => i !== index);
    setExercicios(novoArray);
  };

  const handleChange = (index, campo, valor) => {
    const novoArray = [...exercicios];
    novoArray[index][campo] = valor;
    setExercicios(novoArray);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <h2>Treino</h2>

        <table className="tabela-treino">
          <thead>
            <tr>
              <th className="coluna-azul">Exercício</th>
              <th className="coluna-azul">Repetições</th>
              <th className="coluna-azul">Observações</th>
              <th className="coluna-azul">Ações</th>
            </tr>
          </thead>
          <tbody>
            {exercicios.length > 0 ? (
              exercicios.map((exercicio, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={exercicio.nome}
                      readOnly={!editando}
                      onChange={(e) => handleChange(index, "nome", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercicio.repeticoes}
                      readOnly={!editando}
                      onChange={(e) => handleChange(index, "repeticoes", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercicio.observacoes}
                      readOnly={!editando}
                      onChange={(e) => handleChange(index, "observacoes", e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="apagar-btn" onClick={() => removerExercicio(index)}>Apagar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="mensagem-vazia">Nenhum exercício adicionado</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="botoes-container">
          <button className="editar-btn" onClick={toggleEdicao}>
            {editando ? "Salvar" : "Editar"}
          </button>
          <button className="adicionar-btn" onClick={adicionarExercicio}>
            + Adicionar Exercício
          </button>
        </div>
      </div>
    </div>
  );
};


export default TreinoPage;
