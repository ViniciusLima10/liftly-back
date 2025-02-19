import LotacaoBarChart from "../../components/BarChart/index.jsx";
import LotacaoGauge from "../../components/GuageChart/index.jsx"
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import "./style.css";

function HomePage() {
const navigate = useNavigate();
    return (
            <div className="content">
                {/* Menu Lateral */}
                <Sidebar/>

                {/* Conteúdo Principal */}
                <div className="main-content">
                    <Header/>
                    <h1 className = "welcome-section">Bem-vindo, hoje seu treino é o A</h1>
                    <button className="button" onClick={() => navigate("/treino")}>Acessar Treino</button>

                    <div className="dashboard">
                        <div className="card">
                            <h3>Lotação Atual</h3>
                            <LotacaoGauge />
                        </div>
                        <div className="cardHome cardBarChart">
                            <h3>Lotação na Última Semana</h3>
                            <LotacaoBarChart />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default HomePage;
