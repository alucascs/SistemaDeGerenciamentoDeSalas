import { useState } from "react";


export function CadastroValidacao() {
  
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

  const validarNome = (nome) => {
    if (nome.length < 4) {
      return "O nome deve ter pelo menos 4 caracteres";
    }
    return "";
  };

  const [dadosCadastro, setDadosCadastro] = useState({
    EmailCadastro: "",
    SenhaCadastro: "",
    NomeCadastro: "",
    RoleUsuario:"ALUNO"
  });

  const [errosCadastro, setErrosCadastro] = useState({
    email: "",
    senha: "",
    nome: ""
  });

  const handleChangeCadastro = (e) => {

    const { name, value } = e.target;

    setDadosCadastro((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (name === "EmailCadastro") {
      setErrosCadastro((prev) => ({ ...prev, email: validarEmail(value) }));
    } else if (name === "SenhaCadastro") {
      setErrosCadastro((prev) => ({ ...prev, senha: validarSenha(value) }));
    }else if(name === "NomeCadastro"){
      setErrosCadastro((prev) => ({ ...prev, nome: validarNome(value) }));
    }
  };

 

  return { dadosCadastro, errosCadastro, handleChangeCadastro };
}