import React from "react";
import Header from "../../components/HeaderAdm";
import Sidebar from "../../components/SideBarAdm";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ClassesAdm = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <Sidebar />
            <Header />

            <div className="main-content">
                <div className="profile-container">
                    <h2>Editar aulas</h2>

                    <div className="form-group">
                        <label>Nome da aula:</label>
                        <input type="text" placeholder="Digite o nome da aula" />
                    </div>

                    <div className="form-group">
                        <label>Horário:</label>
                        <input type="tel" placeholder="Digite o horário da aula" />

                        <button className="button">Confirmar</button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesAdm;
