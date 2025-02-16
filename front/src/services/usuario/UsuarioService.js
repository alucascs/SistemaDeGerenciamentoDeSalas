import { API_ALOCACAO } from "../api";
import {CadastrarUsuario} from "../../rotas/RotasUsuario";




export async function cadastrarUsuario(dadosCadastro) {

    try {
        const Usuario = {
            nome: dadosCadastro.NomeCadastro,
            email: dadosCadastro.EmailCadastro,
            password: dadosCadastro.SenhaCadastro,
            role: dadosCadastro.RoleUsuario
          }
        const response = await API_ALOCACAO.post(CadastrarUsuario, Usuario);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}