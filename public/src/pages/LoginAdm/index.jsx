import Login from "../../components/Login";
import "../../components/Login/index"

const LoginAdm = () => {
  return (
  <div className="login-container">
    <Login tipoUsuario="adm" />;
  </div>
  )
};

export default LoginAdm;
