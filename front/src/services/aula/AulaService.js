import { API_ALOCACAO } from "../api";
import { ListarAulas, ListarAulasPorDisciplinas, AlocarAula, ExcluirAula } from "../../rotas/RotasAulas";

export async function cadastrarAula(dadosAula) {
    try {
        const AulaDTO = {
            disciplina: { id: Number(dadosAula.DisciplinaID) },
            sala: { id: Number(dadosAula.SalaID) },
            diaSemana: dadosAula.DiaSemana,      
            horarioInicio: dadosAula.HoraInicio, 
            duracao: Number(dadosAula.Duracao)
        };

        const response = await API_ALOCACAO.post(AlocarAula, AulaDTO);
        return response.status;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}



export async function buscarAulas() {
    try {
        const response = await API_ALOCACAO.get(ListarAulas);
        const Lista = response.data;
        if (Lista != "") {
          return Lista;
        }
        else {
          return [];
        }

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}