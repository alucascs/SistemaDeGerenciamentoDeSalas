const BASEURL = "/disciplinas";
const DeletarDisciplina = BASEURL + "/{id}";
const BuscarDisciplinaByID = BASEURL + "/{id}";
const VincularDesvincularUsuario = BASEURL + "/{disciplinaId}/usuarios/{usuarioId}";
const ListarUsuariosPorDisciplina = BASEURL + "/{id}/usuarios";
const ListarDisciplinas  = BASEURL;
const EditarDisciplina = BASEURL;
const CadastrarDisciplina = BASEURL;
export {ListarDisciplinas, EditarDisciplina, CadastrarDisciplina, DeletarDisciplina, VincularDesvincularUsuario, ListarUsuariosPorDisciplina,BuscarDisciplinaByID };