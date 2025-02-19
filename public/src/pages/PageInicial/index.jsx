import { useNavigate } from "react-router-dom";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bem-vindo à Liftly</h1>
        <p>Seu eu do futuro agradece</p>

        <div className="button-group">
          <button className="home-btn" onClick={() => navigate("/loginAluno")}>Entrar como aluno</button>
          <button className="home-btn" onClick={() => navigate("/loginAdm")}>Entrar como administrador</button>
          <button className="home-btn" onClick={() => navigate("/loginPersonal")}>Entrar como personal</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
