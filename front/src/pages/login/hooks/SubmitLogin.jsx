import { useState, useContext } from "react";
import { UserContext } from "../../../services/context/user";
import { efetuarLogin } from "../../../services/login/LoginService";
import { useNavigate } from "react-router-dom";

export function SubmitLogin(dadosLogin, erros) {
  const [messageErrorLogin, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!erros.email && !erros.senha && dadosLogin.EmailLogin && dadosLogin.SenhaLogin) {
      try {
        // Passe o setUser como argumento para a função efetuarLogin
        const response = await efetuarLogin(dadosLogin, setUser);
        
        setMessage("Login efetuado com sucesso!");
        navigate("/home");

      } catch (error) {
        setMessage("Email ou senha incorretos");
        console.error("Erro:", error);
      }
    } else {
      setMessage("Preencha os campos corretamente");
    }
  };

  return { handleSubmitLogin, messageErrorLogin };
}
