import { useState } from "react";


export function SalaValidacao() {
  
	const validarNome = (nome) => {
        if(nome.length < 5){
            return "O nome da sala deve ter pelo menos 5 caracteres";
        }
    return "";
  };

  const validarCodigo = (codigo) => {
    if (codigo.length < 6) {
      return "O código deve ter pelo menos 6 caracteres";
    }
    return "";
  };

  const [dadosSala, setDadosSala] = useState({
    CodigoSala: "",
    NomeSala: ""
  });

  const [errosSala, setErrosSala] = useState({
    CodigoSala: "",
    NomeSala: ""
  });

  const handleChangeSala = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setDadosSala((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "NomeSala") {
      setErrosSala((prev) => ({ ...prev, NomeSala: validarNome(value) }));
    } else if (name === "CodigoSala") {
      setErrosSala((prev) => ({ ...prev, CodigoSala: validarCodigo(value) }));
    }
  };

 

  return { dadosSala, errosSala, handleChangeSala };
}


