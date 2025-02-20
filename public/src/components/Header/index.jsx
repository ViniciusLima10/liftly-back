import React from "react";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import "./style.css";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <span></span>
            <button className="user-button" onClick={() => navigate("/perfilAluno")}>
                Olá, Julia
            </button>
        </div>
    );
};

export default Header;
