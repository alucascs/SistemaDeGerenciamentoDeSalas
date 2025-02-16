import { API_ALOCACAO } from "../api";
import { Login } from "../../rotas/RotasAutenticacao"



export async function efetuarLogin(dadosLogin) {
  try {

    const DadosAutenticacao = { 
      email: dadosLogin.EmailLogin, 
      senha: dadosLogin.SenhaLogin 
    }

    const response = await API_ALOCACAO.post(Login, DadosAutenticacao);
    return response.data;

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}
