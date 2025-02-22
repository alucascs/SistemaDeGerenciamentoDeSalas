import Swal from "sweetalert2";
import { API_ALOCACAO } from "../../../services/api";
import { ListarDisciplinas, VincularDesvincularUsuario } from "../../../rotas/RotasDisciplinas";

export async function vincularDisciplina(user, setReloadDisciplinas) {
    try {
        const response = await API_ALOCACAO.get(ListarDisciplinas);
        const disciplinas = response.data;

        if (!disciplinas.length) {
            return Swal.fire("Erro", "Nenhuma disciplina disponível!", "error");
        }

        Swal.fire({
            title: "Vincular Disciplina",
            html: `
                <select id="select-disciplina" class="swal2-input">
                    <option value="" disabled selected>Selecione uma disciplina</option>
                    ${disciplinas
                        .map(disc => `<option value="${disc.id}">${disc.nome}</option>`)
                        .join("")}
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: "Vincular",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const disciplinaId = document.getElementById("select-disciplina").value;
                if (!disciplinaId) {
                    Swal.showValidationMessage("Selecione uma disciplina!");
                }
                return disciplinaId;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const disciplinaId = result.value;
                const usuarioId = sessionStorage.getItem("usuarioId");

                const urlCompleta = VincularDesvincularUsuario
                    .replace("{disciplinaId}", disciplinaId)
                    .replace("{usuarioId}", user.id);

                API_ALOCACAO.post(urlCompleta)
                    .then(() => {
                        Swal.fire("Sucesso!", "Disciplina vinculada com sucesso.", "success");
                        setReloadDisciplinas(prevState => !prevState);
                    }).catch(() => Swal.fire("Erro", "Falha ao vincular disciplina.", "error"));
            }
        });
    } catch (error) {
        Swal.fire("Erro", "Falha ao carregar disciplinas!", "error");
    }
}
