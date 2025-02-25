const BASEURL = "/salas";
const ListarSalas = BASEURL;
const CadastrarSala = BASEURL;
const EditarSala = BASEURL;
const ListarSalasComAulas = BASEURL + "/aulas/{diaSemana}";
const ExcluirSala = BASEURL + "/{id}";
const BuscarByID = BASEURL + "/{id}";

export { ListarSalas, CadastrarSala, ListarSalasComAulas, EditarSala, ExcluirSala, BuscarByID }