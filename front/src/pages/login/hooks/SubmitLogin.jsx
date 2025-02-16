import { useState } from "react";
import { efetuarLogin } from "../../../services/login/LoginService";

export function SubmitLogin(dadosLogin, erros) {
  const [messageErrorLogin, setMessage] = useState("");

  const handleSubmitLogin = async (e) => {
   e.preventDefault();

    if (!erros.email && !erros.senha && dadosLogin.EmailLogin && dadosLogin.SenhaLogin) {
      try {

        const response = await efetuarLogin(dadosLogin);
     
        //Redirecionar pra homepage
        setMessage("Login efetuado com sucesso!");

      }
      catch (error) {

        setMessage("Email ou senha incorretos");
        console.error("Erro:", error);
      }

    }
    else {
      setMessage("Preencha os campos corretamente");
    }
  };

  return { handleSubmitLogin, messageErrorLogin };
}
