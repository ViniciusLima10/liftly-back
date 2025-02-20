import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = ({ tipoUsuario }) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.usuario === usuario && u.senha === senha && u.tipo === tipoUsuario);

    if (user) {
      alert(`Login bem-sucedido para ${tipoUsuario}!`);
      localStorage.setItem("userType", user.tipo);
      setErro("");

      // Redireciona com base no tipo de usuário
      if (user.tipo === "aluno") {
        navigate("/homeAluno");
      } else if (user.tipo === "adm") {
        navigate("/homeAdm");
      } else if (user.tipo === "personal") {
        navigate("/homePersonal");
      }
    } else if (usuario.trim() === "" || senha.trim() === "") {
      alert("Preencha todos os campos!");
      setErro("");
    } else {
      alert("Erro ao efetuar Login!");
      setErro("");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login {tipoUsuario}</h1>
        <div className="input-field">
          <FaUser className="icon" />
          <input type="text" placeholder="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div className="input-field">
          <FaLock className="icon" />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        {erro && <p className="error-message">{erro}</p>}
        <div className="recall-forget">
          <a href="#" onClick={() => navigate("/esqueci-senha")}>Esqueceu a senha?</a>
        </div>
        <button type="submit">Entrar</button>
        <div className="register-txt">
          <p className="register-text">Ainda não possui cadastro?</p>
        </div>
        <button type="button" className="register-btn" onClick={() => navigate("/cadastro")}>Cadastre-se</button>
      </form>
    </div>
  );
};

export default Login;
