import { useEffect } from 'react';
import Swal from "sweetalert2";
import { API_ALOCACAO } from "../../../services/api";
import { ListarAulasPorDisciplinas } from "../../../rotas/RotasAulas"
export function useAlocacoes(setAlocacoes, disciplinas) {
  useEffect(() => {
    const getAlocacoes = async () => {
      try {
        let disciplinasID = disciplinas.map(disc => disc.id);
        const response = await API_ALOCACAO.post(ListarAulasPorDisciplinas, disciplinasID);
        setAlocacoes(response.data || []);
      } catch (error) {
        Swal.fire("Erro", "Falha ao carregar as aulas!", "error");
      }
    };

    if (disciplinas.length > 0) {
      getAlocacoes();
    }
  }, [disciplinas]);
}
