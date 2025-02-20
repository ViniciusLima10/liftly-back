import React from "react";
import Header from "../../components/HeaderAdm";
import Sidebar from "../../components/SideBarAdm";
import "./style.css";

const CadastroAluno = () => {
    return (
        <div className="container">
            <Sidebar />
            <Header />

            <div className="main-content">
                <div className="profile-container">
                    <h2>Cadastro do aluno</h2>

                    <div className="form-group">
                        <label>Nome do aluno:</label>
                        <input type="text" placeholder="Digite o nome do aluno" />
                    </div>

                    <div className="form-group">
                        <label>Email do aluno:</label>
                        <input type="email" placeholder="Digite o email do aluno" />
                    </div>

                    <div className="form-group">
                        <label>Telefone do aluno:</label>
                        <input type="tel" placeholder="Digite o telefone do aluno" />

                        <button className="button">Confirmar</button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastroAluno;
