import { useState } from "react";
import { cadastrarSala } from "../../../services/salas/SalasService";
import Swal from "sweetalert2";

export function SubmitSala(dadosSala, erros, fetchSalas) {
    const [messageErrorSala, setMessage] = useState("");

    const handleSubmitSala = async (e) => {
        e.preventDefault();
        if (!erros.NomeSala && !erros.CodigoSala && dadosSala.NomeSala && dadosSala.CodigoSala) {
            try {
                const response = await cadastrarSala(dadosSala);

                if (response == 200) {
                    Swal.fire("Feito", "Sala cadastrada com sucesso!", "success");
            
                    if (fetchSalas) {
                        await fetchSalas();
                    }
                } else {
                    Swal.fire("Erro", "Erro ao cadastrar sala!", "error");
                }

                console.log("Resposta do servidor:", response);
            } catch (error) {
                Swal.fire("Erro", `Erro ao cadastrar sala: ${error}`, "error");
            }
        } else {
            setMessage("Preencha os campos corretamente");
        }
    };

    return { handleSubmitSala, messageErrorSala };
}

