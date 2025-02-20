import React from "react";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaChartBar, FaDumbbell, FaClipboardList } from "react-icons/fa";
import "./style.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar top-bar">
      <h1>Liftly</h1>
      <ul>
        <li>
        <button className="sidebar-btn" onClick={() => navigate("/MenuAluno")}>
             <FaChartBar/>   Lotação
            </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => navigate("/treino")}>
            <FaDumbbell /> Treino
          </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => navigate("/")}>
            <FaClipboardList /> Aulas
          </button>
        </li>
      </ul>

      {/* Ícones na parte inferior */}
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={40} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF size={40} />
        </a>
        <a href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={40} />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
