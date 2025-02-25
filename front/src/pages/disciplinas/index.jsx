import { SwalEditarDisciplina } from "./hooks/AcoesDisciplinas";
import { SwalDeletarDisciplina } from "./hooks/AcoesDisciplinas";
import { useDisciplinas } from "./hooks/AcoesDisciplinas";
import { useProfessores } from "./hooks/AcoesDisciplinas";
import { BiPen } from "react-icons/bi";
import styles from "./styles.module.css";
import { BiTrash } from "react-icons/bi";
import classNames from "classnames";
import { SubmitDisciplina } from "./hooks/SubmitDisciplina";
import { DisciplinaValidacao } from "./hooks/DisciplinaValidacao";

function Diciplinas() {

    const { dadosDisciplina, errosDisciplina, handleChangeDisciplina } = DisciplinaValidacao();
    const { disciplinas, fetchDisciplinas } = useDisciplinas();
    const { handleSubmitDisciplina, messageErrorDisciplina } = SubmitDisciplina(dadosDisciplina, errosDisciplina, fetchDisciplinas);
    const {professores, fetchProfessores} = useProfessores();


    return (

        <>
            <div className={styles.contentLogin} >
                <div className={styles.containerHeaderLogin}>
                    <h1 className={styles.h2Login}>Gerenciamento de Diciplinas</h1>
                </div>
                <div className={classNames(styles.containerLogin)} >
                    <div className={classNames(styles.formContainerLogin, styles.signUpContainerLogin)}>
                        <form className={styles.formLogin} onSubmit={handleSubmitDisciplina}>
                            <h3>Cadastrar Disciplina</h3>
                            <input
                                className={styles.inputLogin}
                                type="text"
                                name="NomeDisciplina"
                                placeholder="Nome da Disciplina"
                                value={dadosDisciplina.NomeDisciplina}
                                onChange={handleChangeDisciplina}
                            />
                            {errosDisciplina.NomeDisciplina && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosDisciplina.NomeDisciplina}
                                </span>
                            )}

                            <input
                                className={styles.inputLogin}
                                type="text"
                                name="CodigoTurma"
                                placeholder="Códido da Turma"
                                value={dadosDisciplina.CodigoTurma}
                                onChange={handleChangeDisciplina}
                            />
                            {errosDisciplina.CodigoTurma && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosDisciplina.CodigoTurma}
                                </span>
                            )}

                            <select
                                className={styles.inputLogin}
                                name="NomeProfessor"
                                value={dadosDisciplina.NomeProfessor}
                                onChange={handleChangeDisciplina}
                            >
                                <option value="">Selecione um professor</option>
                                {professores.map((professor) => (
                                    <option key={professor.id} value={professor.nome}>
                                        {professor.nome}
                                    </option>
                                ))}
                            </select>

                            {errosDisciplina.NomeProfessor && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosDisciplina.NomeProfessor}
                                </span>
                            )}


                            <button className={styles.btnLogin} type="submit">
                                Cadastrar
                            </button>

                            <br />
                            {messageErrorDisciplina && <div>{messageErrorDisciplina}</div>}
                        </form>

                    </div>

                    <div className={styles.containerTable}>

                        <table className="table table-striped-columns table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome da Disciplina</th>
                                    <th scope="col">Código da Turma</th>
                                    <th scope="col">Professor</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disciplinas.map((disciplina) => (
                                    <tr key={disciplina.id}>
                                        <td>{disciplina.id}</td>
                                        <td>{disciplina.nome}</td>
                                        <td>{disciplina.codigoTurma}</td>
                                        <td>{disciplina.nomeProfessor}</td>
                                        <td> <button type="button" className="btn btn-info" onClick={() => SwalEditarDisciplina(disciplina.id, fetchDisciplinas,professores)}> <BiPen size={18}></BiPen> </button></td>
                                        <td> <button type="button" className="btn btn-danger" onClick={() => SwalDeletarDisciplina(disciplina.id, fetchDisciplinas)}> <BiTrash size={18}></BiTrash> </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>

    )
} export default Diciplinas