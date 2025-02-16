
import { LoginAnimacao } from './hooks/LoginAnimacao'
import { LoginValidacao } from './hooks/LoginValidacao'
import { SubmitLogin } from './hooks/SubmitLogin';
import { CadastroValidacao } from './hooks/CadastroValidacao';
import { SubmitCadastro } from './hooks/SubmitCadastro';

import './style.css'

function Login() {

	LoginAnimacao();

	const { dadosLogin, errosLogin, handleChangeLogin } = LoginValidacao();
	const { handleSubmitLogin, messageErrorLogin } = SubmitLogin(dadosLogin, errosLogin);

	const { dadosCadastro, errosCadastro, handleChangeCadastro } = CadastroValidacao();
	const { handleSubmitCadastro, messageErrorCadastro } = SubmitCadastro(dadosCadastro, errosCadastro);

	return (
		<>
			<div className='containerHeader'>
				<h2>Bem vindo ao gerenciador de salas do IFBA</h2>
			</div>

			<div className="container" id="container">
				<div className="form-container sign-up-container">
					<form  onSubmit={handleSubmitCadastro}>
						<h1>Crie sua conta</h1>
						<input type="text" name='NomeCadastro' placeholder="Nome" value={dadosCadastro.NomeCadastro} onChange={handleChangeCadastro} />
						{errosCadastro.nome && <span style={{ color: "red" }}>{errosCadastro.nome}</span>}

						<input type="email" name='EmailCadastro' placeholder="Email" value={dadosCadastro.EmailCadastro} onChange={handleChangeCadastro} />
						{errosCadastro.email && <span style={{ color: "red" }}>{errosCadastro.email}</span>}

						<input type="password" name='SenhaCadastro' placeholder="Senha" value={dadosCadastro.SenhaCadastro} onChange={handleChangeCadastro} />
						{errosCadastro.senha && <span style={{ color: "red" }}>{errosCadastro.senha}</span>}

						<div className="radio-group">
							<label>
								<input type="radio" name="RoleUsuario"    value="ALUNO"   checked={dadosCadastro.RoleUsuario === "ALUNO"}  onChange={handleChangeCadastro}  />
								Aluno
							</label>
							<label>
								<input type="radio" name="RoleUsuario"     value="PROFESSOR"  checked={dadosCadastro.RoleUsuario === "PROFESSOR"}  onChange={handleChangeCadastro} />
								Professor
							</label>
						</div>
				

						<button type="submit" >Registrar</button>
					
						<br></br>
						{messageErrorCadastro && <div>{messageErrorCadastro}</div>} {/* Exibindo a mensagem de sucesso ou erro */}
					</form>
				</div>

				<div className="form-container sign-in-container">
					<form onSubmit={handleSubmitLogin}>
						<h1>Faça login</h1>
						<input type="email" name='EmailLogin' placeholder="Email" value={dadosLogin.EmailLogin} onChange={handleChangeLogin} />
						{errosLogin.email && <span style={{ color: "red" }}>{errosLogin.email}</span>}

						<input type="password" name='SenhaLogin' placeholder="Senha" value={dadosLogin.SenhaLogin} onChange={handleChangeLogin} />
						{errosLogin.senha && <span style={{ color: "red" }}>{errosLogin.senha}</span>}

						<button type="submit">Entrar</button>
				
						<br></br>
						{messageErrorLogin && <div>{messageErrorLogin}</div>} {/* Exibindo a mensagem de sucesso ou erro */}
					</form>
				</div>

				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Já se cadastrou?</h1>
							<p>Faça o seu login clicando abaixo</p>
							<button className="ghost" name='botaoLogin' id="signIn">Login</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Olá, que tal criar sua conta?</h1>
							<p>Registre-se clicando no botão abaixo</p>
							<button className="ghost" name='botaoRegistrar' id="signUp">Cadastrar</button>
						</div>
					</div>
				</div>
			</div>


			<footer>
				<p>
					Desenvolvido por Emanuel Sena (confia kkkkkk)
				</p>
			</footer>


		</>
	)
}

export default Login
