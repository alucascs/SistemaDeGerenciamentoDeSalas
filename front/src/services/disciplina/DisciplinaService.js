import { API_ALOCACAO } from "../api";
import { CadastrarDisciplina,BuscarDisciplinaByID,ListarDisciplinas,EditarDisciplina,DeletarDisciplina } from "../../rotas/RotasDisciplinas";

export async function cadastrarDisciplina(dadosDisciplina) {
  try {
    const DisciplinaDTO = { 
      nome: dadosDisciplina.NomeDisciplina, 
      codigoTurma: dadosDisciplina.CodigoTurma,
      nomeProfessor: dadosDisciplina.NomeProfessor
    };

    const response = await API_ALOCACAO.post(CadastrarDisciplina, DisciplinaDTO);

    return response;

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function buscarDisciplinas(){
  try {

    const response = await API_ALOCACAO.get(ListarDisciplinas);
    const Lista = response.data;
    return Lista;

  }
  catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function buscarDisciplinaByID(id){
  try {
    const response = await API_ALOCACAO.get(BuscarDisciplinaByID.replace("{id}", id))
    const disciplina = response.data;
    return disciplina;

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function deletarDisciplina(id){
  try {
    const response = await API_ALOCACAO.delete(DeletarDisciplina.replace("{id}", id))
 
    return response.status;

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function editarDisciplina(disciplinaDTO){

  try {

    const response = await API_ALOCACAO.put(EditarDisciplina,disciplinaDTO);
    return response;

  }
  catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}