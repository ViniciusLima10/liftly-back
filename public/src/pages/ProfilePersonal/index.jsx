import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./style.css";

const ProfilePersonal = () => {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState(""); // Mensagem de sucesso ou erro

    // Função para validar email
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Função para salvar os dados
    const handleSalvar = () => {
        if (!nome || !email || !telefone) {
            setMensagem("Por favor, preencha todos os campos.");
            return;
        }

        if (!validarEmail(email)) {
            setMensagem("Erro: O email inserido é inválido.");
            return;
        }

        // Simula a atualização bem-sucedida do perfil
        setMensagem("Perfil atualizado com sucesso!");
    };

    return (
        <div className="container">
            <Sidebar />
            <Header />

            <div className="main-content">
                <div className="profile-container">
                    <h2>Perfil Personal</h2>

                    <div className="form-group">
                        <label>Nome:</label>
                        <input 
                            type="text" 
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone:</label>
                        <input 
                            type="tel" 
                            placeholder="Digite seu telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    {/* Exibição da mensagem de erro ou sucesso */}
                    {mensagem && <p className={mensagem.includes("Erro") ? "error-message" : "success-message"}>{mensagem}</p>}

                    <button className="button" onClick={handleSalvar}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePersonal;
