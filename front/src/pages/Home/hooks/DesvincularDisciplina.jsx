import Swal from 'sweetalert2';
import { API_ALOCACAO } from "../../../services/api";
import { VincularDesvincularUsuario } from "../../../rotas/RotasDisciplinas";

export async function DesvincularDisciplina(user, id, nome) {
    Swal.fire({
        title: `Deseja remover a disciplina "${nome}"?`,
        text: "Esta ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const usuarioId = user.id; 

                const urlCompleta = VincularDesvincularUsuario
                    .replace("{disciplinaId}", id)
                    .replace("{usuarioId}", usuarioId);

                await API_ALOCACAO.delete(urlCompleta); 
                Swal.fire(
                    "Removida!",
                    `A disciplina "${nome}" foi desvinculada com sucesso.`,
                    "success"
                );
            } catch (error) {
                Swal.fire("Erro", "Falha ao desvincular a disciplina.", "error");
            }
        }
    });
}
