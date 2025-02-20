import React, { useState } from "react";
import Header from "../../components/HeaderAdm";
import Sidebar from "../../components/SideBarAdm";
import "./style.css";

const ProfileAdm = () => {
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
        setMensagem("Perfil da academia atualizado com sucesso!");
    };

    return (
        <div className="container">
            <Sidebar />
            <Header />

            <div className="main-content">
                <div className="profile-container">
                    <h2>Perfil da academia</h2>

                    <div className="form-group">
                        <label>Nome da academia:</label>
                        <input 
                            type="text" 
                            placeholder="Digite o nome da academia" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email da academia:</label>
                        <input 
                            type="email" 
                            placeholder="Digite o email da academia" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone da academia:</label>
                        <input 
                            type="tel" 
                            placeholder="Digite o telefone da academia" 
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

export default ProfileAdm;
