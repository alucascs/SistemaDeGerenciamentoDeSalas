import { API_ALOCACAO } from "../api";
import { Login } from "../../rotas/RotasAutenticacao";

export async function efetuarLogin(dadosLogin, setUser) {
  try {
    const DadosAutenticacao = { 
      email: dadosLogin.EmailLogin, 
      senha: dadosLogin.SenhaLogin 
    };

    const response = await API_ALOCACAO.post(Login, DadosAutenticacao);

    if (response?.data.token) {
      sessionStorage.setItem("authToken", response.data.token);

      const { senha, ...userWithoutPassword } = response.data.user;

      sessionStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword); 
    }
    return response.data;

  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}