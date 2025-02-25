
import { SalaValidacao } from "./hooks/SalaValidacao";
import { SubmitSala } from "./hooks/SubmitSala";
import classNames from "classnames";
import styles from "./styles.module.css";
import { BiTrash } from "react-icons/bi";
import { useSalas } from "./hooks/AcoesSalas"
import { BiPen } from "react-icons/bi";
import { SwalEditarSala } from "./hooks/AcoesSalas";
import { SwalDeletarSala } from "./hooks/AcoesSalas";


function Salas() {


	const { dadosSala, errosSala, handleChangeSala } = SalaValidacao();
	const { salas, fetchSalas } = useSalas();
	const { handleSubmitSala, messageErrorSala } = SubmitSala(dadosSala, errosSala, fetchSalas);

	return (

		<>

			<div className={styles.contentLogin} >
				<div className={styles.containerHeaderLogin}>
					<h1 className={styles.h2Login}>Gerenciamento de Salas</h1>
				</div>

				<div className={classNames(styles.containerLogin)} >
					<div className={classNames(styles.formContainerLogin, styles.signInContainerLogin)}>
						<form className={styles.formLogin} onSubmit={handleSubmitSala}>
							<h3>Cadastrar Sala</h3>

							<input
								className={styles.inputLogin}
								type="text"
								name="NomeSala"
								placeholder="Nome da Sala"
								value={dadosSala.NomeSala}
								onChange={handleChangeSala}
							/>
							{errosSala.NomeSala && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosSala.NomeSala}
								</span>
							)}

							<input
								className={styles.inputLogin}
								type="text"
								name="CodigoSala"
								placeholder="Código da Sala"
								value={dadosSala.CodigoSala}
								onChange={handleChangeSala}
							/>
							{errosSala.CodigoSala && (
								<span className={styles.spanLogin} style={{ color: 'red' }}>
									{errosSala.CodigoSala}
								</span>
							)}

							<button className={styles.btnLogin} type="submit">
								Cadastrar
							</button>

							<br />
							{messageErrorSala && <div>{messageErrorSala}</div>}
						</form>
					</div>
					<div className={styles.containerTable}>

						<table className="table table-striped-columns table-bordered">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Nome da Sala</th>
									<th scope="col">Código da Sala</th>
									<th scope="col">Editar</th>
									<th scope="col">Deletar</th>
								</tr>
							</thead>
							<tbody>
								{salas.map((sala) => (
									<tr key={sala.id}>
										<td>{sala.id}</td>
										<td>{sala.nome}</td>
										<td>{sala.codigo}</td>
										<td> <button type="button" className="btn btn-info" onClick={() => SwalEditarSala(sala.id, fetchSalas)}> <BiPen size={18}></BiPen> </button></td>
										<td> <button type="button" className="btn btn-danger" onClick={()=> SwalDeletarSala(sala.id,fetchSalas)}> <BiTrash size={18}></BiTrash> </button></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
} export default Salas

