import { useState } from "react";
import { cadastrarAula } from "../../../services/aula/AulaService";
import Swal from "sweetalert2";

export function SubmitAula(dadosAula, erros, fetchAulas) {
  const [messageErrorAula, setMessage] = useState("");

  const handleSubmitAula = async (e) => {
  e.preventDefault();
    if (!erros.DiaSemana && !erros.Duracao && !erros.HoraInicio && !erros.SalaID && !erros.DisciplinaID ) {
        try {
            const response = await cadastrarAula(dadosAula);
        
            if (response == 201) {  
                 Swal.fire("Feito", "Aula cadastrada com sucesso!", "success");

              if (fetchAulas) {
                    await fetchAulas();
                }

            } else {
              Swal.fire("Erro", "Erro ao cadastrar Aula", "error");
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

  return { handleSubmitAula, messageErrorAula };
}