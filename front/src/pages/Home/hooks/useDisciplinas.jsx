import { useEffect } from 'react';
import Swal from "sweetalert2";
import { API_ALOCACAO } from "../../../services/api";
import { GetDisciplinasUsuario } from "../../../rotas/RotasUsuario";

export function useDisciplinas(user, setDisciplinas) {
    useEffect(() => {
        const getDisciplinas = async () => {
            try {
                const uriCompleta = GetDisciplinasUsuario.replace("{id}", user.id);
                const response = await API_ALOCACAO.get(uriCompleta);
                setDisciplinas(response.data || []);
            } catch (error) {
                Swal.fire("Erro", "Falha ao carregar disciplinas!", "error");
            }
        };

        getDisciplinas();
    }, [user]);
}


