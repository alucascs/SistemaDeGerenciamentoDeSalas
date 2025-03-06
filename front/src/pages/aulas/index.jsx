
import { useDisciplinas } from "../disciplinas/hooks/AcoesDisciplinas";
import { useAulas } from "./hooks/AulaAcoes";
import { useSalas } from "../salas/hooks/AcoesSalas";
import { SubmitAula } from "./hooks/SubmitAula";
import { AulaValidacao } from "./hooks/AulaValidacao";
import { BiPen } from "react-icons/bi";
import styles from "./styles.module.css";
import { BiTrash } from "react-icons/bi";
import classNames from "classnames";
import { SwalEditarAula } from "./hooks/AulaAcoes";
import { SwalDeletarAula } from "./hooks/AulaAcoes";


function Aulas() {

    const { dadosAula, errosAula, handleChangeAula } = AulaValidacao();
    const { Aulas, fetchAulas } = useAulas();
    const { handleSubmitAula, messageErrorAula } = SubmitAula(dadosAula, errosAula, fetchAulas);
    const { salas, fetchSalas } = useSalas();
    const { disciplinas, fetchDisciplinas } = useDisciplinas();


    return (

        <>
            <div className={styles.contentLogin} >
                <div className={styles.containerHeaderLogin}>
                    <h1 className={styles.h2Login}>Gerenciamento de Aulas</h1>
                </div>
                <div className={classNames(styles.containerLogin)} >
                    <div className={classNames(styles.formContainerLogin, styles.signUpContainerLogin)}>
                        <form className={styles.formLogin} onSubmit={handleSubmitAula}>
                            <h3>Cadastrar Aula</h3>
                            <select
                                className={styles.inputLogin}
                                name="SalaID"
                                value={dadosAula.SalaID}
                                onChange={handleChangeAula}
                            >
                                <option value="">Selecione uma Sala</option>
                                {salas.map((sala) => (
                                    <option key={sala.id} value={sala.id}>
                                        {sala.codigo + " - " + sala.nome}
                                    </option>
                                ))}
                            </select>

                            {errosAula.NomeSala && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosAula.NomeSala}
                                </span>
                            )}


                            <select
                                className={styles.inputLogin}
                                name="DisciplinaID"
                                value={dadosAula.DisciplinaID}
                                onChange={handleChangeAula}
                            >
                                <option value="">Selecione uma Disciplina</option>
                                {disciplinas.map((disciplina) => (
                                    <option key={disciplina.id} value={disciplina.id}>
                                        {disciplina.codigoTurma + " - " + disciplina.nome}
                                    </option>
                                ))}
                            </select>

                            {errosAula.NomeDisciplina && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosAula.NomeDisciplina}
                                </span>
                            )}


                            <select
                                className={styles.inputLogin}
                                name="HoraInicio"
                                value={dadosAula.HoraInicio}
                                onChange={handleChangeAula}
                            >
                                <option value="">Selecione a Hora de inicio</option>
                                <option value="17:00">17:00</option>
                                <option value="17:50">17:50</option>
                                <option value="18:40">18:40</option>
                                <option value="19:30">19:30</option>
                                <option value="20:20">20:20</option>
                                <option value="21:10">21:10</option>
                            </select>

                            {errosAula.HoraInicio && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosAula.HoraInicio}
                                </span>
                            )}



                            <select
                                className={styles.inputLogin}
                                name="Duracao"
                                value={dadosAula.Duracao}
                                onChange={handleChangeAula}
                            >
                                <option value=""> Selecione uma Duração</option>

                                <option value="50">
                                    50 minutos
                                </option>
                                <option value="100">
                                    100 minutos
                                </option>
                                <option value="150">
                                    150 minutos
                                </option>
                                <option value="200">
                                    200 minutos
                                </option>
                                <option value="250">
                                    250 minutos
                                </option>
                                <option value="300">
                                    300 minutos
                                </option>

                            </select>

                            {errosAula.Duracao && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosAula.Duracao}
                                </span>
                            )}

                            <select
                                className={styles.inputLogin}
                                name="DiaSemana"
                                value={dadosAula.DiaSemana}
                                onChange={handleChangeAula}
                            >
                                <option value="">Selecione um Dia</option>

                                <option value="SEGUNDA">
                                    Segunda-Feira
                                </option>
                                <option value="TERÇA">
                                    Terça-Feira
                                </option>
                                <option value="QUARTA">
                                    Quarta-Feira
                                </option>
                                <option value="QUINTA">
                                    Quinta-Feira
                                </option>
                                <option value="SEXTA">
                                    Sexta-Feira
                                </option>
                                <option value="SABADO">
                                    Sábado
                                </option>

                            </select>

                            {errosAula.DiaSemana && (
                                <span className={styles.spanLogin} style={{ color: 'red' }}>
                                    {errosAula.DiaSemana}
                                </span>
                            )}

                            <button className={styles.btnLogin} type="submit">
                                Cadastrar
                            </button>

                            <br />
                            {messageErrorAula && <div>{messageErrorAula}</div>}
                        </form>

                    </div>

                    <div className={styles.containerTable}>

                        <table className="table table-striped-columns table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Disciplina</th>
                                    <th scope="col">Sala</th>
                                    <th scope="col">Professor</th>
                                    <th scope="col">Dia</th>
                                    <th scope="col">Hora inicio</th>
                                    <th scope="col">Duração(Minutos)</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Aulas.map((Aula) => (
                                    <tr key={Aula.id}>
                                        <td>{Aula.id}</td>
                                        <td>{Aula.disciplina.nome + " - " + Aula.disciplina.codigoTurma}</td>
                                        <td>{Aula.sala.nome + " - " + Aula.sala.codigo}</td>
                                        <td>{Aula.disciplina.nomeProfessor}</td>
                                        <td>{Aula.diaSemana}</td>
                                        <td>{Aula.horarioInicio}</td>
                                        <td>{Aula.duracao}</td>

                                        <td> <button type="button" className="btn btn-info" onClick={() => SwalEditarAula(Aula.id, fetchAulas, salas, disciplinas)}> <BiPen size={18}></BiPen> </button></td>
                                        <td> <button type="button" className="btn btn-danger" onClick={() => SwalDeletarAula(Aula.id, fetchAulas,salas, disciplinas)}> <BiTrash size={18}></BiTrash> </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>

    )
} export default Aulas