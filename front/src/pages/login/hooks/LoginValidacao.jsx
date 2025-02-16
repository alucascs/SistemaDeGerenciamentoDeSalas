import { useState } from "react";


export function LoginValidacao() {
  
	const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "E-mail inválido";
    }
    return "";
  };

  const validarSenha = (senha) => {
    if (senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
    }
    return "";
  };

  const [dadosLogin, setDadosLogin] = useState({
    EmailLogin: "",
    SenhaLogin: "",
  });

  const [errosLogin, setErrosLogin] = useState({
    email: "",
    senha: "",
  });

  const handleChangeLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setDadosLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "EmailLogin") {
      setErrosLogin((prev) => ({ ...prev, email: validarEmail(value) }));
    } else if (name === "SenhaLogin") {
      setErrosLogin((prev) => ({ ...prev, senha: validarSenha(value) }));
    }
  };

 

  return { dadosLogin, errosLogin, handleChangeLogin };
}


