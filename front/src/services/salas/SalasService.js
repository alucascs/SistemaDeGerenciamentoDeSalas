import { API_ALOCACAO } from "../api";
import { CadastrarSala, ListarSalas, BuscarByID,EditarSala,ExcluirSala } from "../../rotas/RotasSalas";


export async function cadastrarSala(dadosSala) {
  try {
    const SalaDTO = {
      nome: dadosSala.NomeSala,
      codigo: dadosSala.CodigoSala

    };

    const response = await API_ALOCACAO.post(CadastrarSala, SalaDTO);
    return response.status;

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function buscarSalas() {
  try {

    const response = await API_ALOCACAO.get(ListarSalas);
    const Lista = response.data;
    return Lista;

  }
  catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function buscarSalaById(id) {

  try {
    const response = await API_ALOCACAO.get(BuscarByID.replace("{id}", id))
    const sala = response.data;
    return sala;



  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function editarSala(salaDTO){

  try {

    const response = await API_ALOCACAO.put(EditarSala,salaDTO);
    return response;

  }
  catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function deletarSala(id){

  try {

    const response = await API_ALOCACAO.delete(ExcluirSala.replace("{id}", id))
    return response.status;

  }
  catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}