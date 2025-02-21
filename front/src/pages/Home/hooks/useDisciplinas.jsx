import { useState, useEffect, useContext } from 'react';
import Swal from "sweetalert2";
import { API_ALOCACAO } from "../../../services/api";
import { GetDisciplinasUsuario } from "../../../rotas/RotasUsuario";
import { UserContext } from '../../../services/context/user';

function useDisciplinas(user) {
    const [disciplinas, setDisciplinas] = useState([]);

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

    return disciplinas;
}

export default useDisciplinas;
