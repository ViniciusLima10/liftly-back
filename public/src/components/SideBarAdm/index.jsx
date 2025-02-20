import React from "react";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaChartBar, FaClipboardList, FaHome } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";
import "./style.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar top-bar">
      <h1>Liftly</h1>
      <ul>
      <li>
          <button className="sidebar-btn" onClick={() => navigate("/HomePageAdm")}>
            <FaHome /> Menu
          </button>
        </li>
        <li>
        <button className="sidebar-btn" onClick={() => navigate("/CadastroAluno")}>
            <MdAppRegistration /> Cadastrar aluno
            </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => navigate("/LotacaoAdm")}>
            <FaChartBar /> Ajustar lotação
          </button>
        </li>
        <li>
          <button className="sidebar-btn" onClick={() => navigate("/EditarAulas")}>
            <FaClipboardList /> Ajustar aulas
          </button>
          </li>
          <li>
          <button className="sidebar-btn" onClick={() => navigate("/CadastroPersonal")}>
            <MdAppRegistration /> Cadastrar personal
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
