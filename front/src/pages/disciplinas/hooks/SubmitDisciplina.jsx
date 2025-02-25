import { useState } from "react";
import { cadastrarDisciplina } from "../../../services/Disciplina/DisciplinaService";
import Swal from "sweetalert2";

export function SubmitDisciplina(dadosDisciplina, erros, fetchDisciplinas) {
  const [messageErrorDisciplina, setMessage] = useState("");

  const handleSubmitDisciplina = async (e) => {
  e.preventDefault();
    if (!erros.NomeDisciplina && !erros.CodigoTurma && !erros.NomeProfessor && dadosDisciplina.NomeDisciplina && dadosDisciplina.CodigoTurma && dadosDisciplina.NomeProfessor) {
        try {
            const response = await cadastrarDisciplina(dadosDisciplina);
        
            if (response.status === 200) {  
                 Swal.fire("Feito", "Disciplina cadastrada com sucesso!", "success");
              if (fetchDisciplinas) {
                await fetchDisciplinas();
            }
            } else {
              Swal.fire("Erro", "Erro ao cadastrar disciplina", "error");
            }
        
            console.log("Resposta do servidor:", response);
        } catch (error) {
          
              Swal.fire("Erro", `Erro ao editar sala: ${error}`, "error");
        }

    }
    else {
      setMessage("Preencha os campos corretamente");
    }
  };

  return { handleSubmitDisciplina, messageErrorDisciplina };
}