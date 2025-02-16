import { useState } from "react";
import { cadastrarUsuario } from "../../../services/usuario/UsuarioService";

export function SubmitCadastro(dadosCadastro, erros) {
  const [messageErrorCadastro, setMessage] = useState("");

  const handleSubmitCadastro = async (e) => {
  e.preventDefault();
    if (!erros.email && !erros.senha && !erros.nome && dadosCadastro.EmailCadastro && dadosCadastro.SenhaCadastro && dadosCadastro.NomeCadastro) {
      try {

        const response = await cadastrarUsuario(dadosCadastro);
        setMessage("Cadastro feito com sucesso");
        console.log("Resposta do servidor:", response);

      }
      catch (error) {

        setMessage("Erro ao fazer cadastro " + error);
        console.error("Erro:", error);
      }

    }
    else {
      setMessage("Preencha os campos corretamente");
    }
  };

  return { handleSubmitCadastro, messageErrorCadastro };
}