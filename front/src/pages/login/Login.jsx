
import { LoginValidacao } from './hooks/LoginValidacao'
import { SubmitLogin } from './hooks/SubmitLogin';
import { CadastroValidacao } from './hooks/CadastroValidacao';
import { SubmitCadastro } from './hooks/SubmitCadastro';
import classNames from 'classnames';
import styles from './styles.module.css';



function Login() {



	const { dadosLogin, errosLogin, handleChangeLogin } = LoginValidacao();
	const { handleSubmitLogin, messageErrorLogin } = SubmitLogin(dadosLogin, errosLogin);

	const { dadosCadastro, errosCadastro, handleChangeCadastro } = CadastroValidacao();
	const { handleSubmitCadastro, messageErrorCadastro } = SubmitCadastro(dadosCadastro, errosCadastro);

	return (

		<>

			<div className={styles.contentLogin} >
				<div className={styles.containerHeaderLogin}>
					<h2 className={styles.h2Login}>Bem-vindo ao gerenciador de salas do IFBA</h2>
				</div>

				<div className={classNames(styles.containerLogin)} id="container" >
					<div className={classNames(styles.formContainerLogin, styles.signUpContainerLogin)}>
						<form className={styles.formLogin} onSubmit={handleSubmitCadastro}>
							<h1>Crie sua conta</h1>
							<input
								className={styles.inputLogin}
								type="text"
								name="NomeCadastro"
								placeholder="Nome"
								value={dadosCadastro.NomeCadastro}
								onChange={handleChangeCadastro}
							/>
							{errosCadastro.nome && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosCadastro.nome}
								</span>
							)}

							<input
								className={styles.inputLogin}
								type="email"
								name="EmailCadastro"
								placeholder="Email"
								value={dadosCadastro.EmailCadastro}
								onChange={handleChangeCadastro}
							/>
							{errosCadastro.email && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosCadastro.email}
								</span>
							)}

							<input
								className={styles.inputLogin}
								type="password"
								name="SenhaCadastro"
								placeholder="Senha"
								value={dadosCadastro.SenhaCadastro}
								onChange={handleChangeCadastro}
							/>
							{errosCadastro.senha && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosCadastro.senha}
								</span>
							)}

							<div className={styles.radioGroupLogin}>
								<label>
									<input
										
										type="radio"
										name="RoleUsuario"
										value="ALUNO"
										checked={dadosCadastro.RoleUsuario === 'ALUNO'}
										onChange={handleChangeCadastro}
									/>
									Aluno
								</label>
								<label>
									<input
										
										type="radio"
										name="RoleUsuario"
										value="PROFESSOR"
										checked={dadosCadastro.RoleUsuario === 'PROFESSOR'}
										onChange={handleChangeCadastro}
									/>
									Professor
								</label>
							</div>

							<button className={styles.btnLogin} type="submit">
								Registrar
							</button>

							<br />
							{messageErrorCadastro && <div>{messageErrorCadastro}</div>}
						</form>
					</div>

					<div className={classNames(styles.formContainerLogin, styles.signInContainerLogin)}>
						<form className={styles.formLogin} onSubmit={handleSubmitLogin}>
							<h1>Faça login</h1>
							<input
								className={styles.inputLogin}
								type="email"
								name="EmailLogin"
								placeholder="Email"
								value={dadosLogin.EmailLogin}
								onChange={handleChangeLogin}
							/>
							{errosLogin.email && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosLogin.email}
								</span>
							)}

							<input
								className={styles.inputLogin}
								type="password"
								name="SenhaLogin"
								placeholder="Senha"
								value={dadosLogin.SenhaLogin}
								onChange={handleChangeLogin}
							/>
							{errosLogin.senha && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosLogin.senha}
								</span>
							)}

							<button className={styles.btnLogin} type="submit">
								Entrar
							</button>

							<br />
							{messageErrorLogin && <div>{messageErrorLogin}</div>}
						</form>
					</div>


				</div>;

			</div>





		</>






	)
}

export default Login
