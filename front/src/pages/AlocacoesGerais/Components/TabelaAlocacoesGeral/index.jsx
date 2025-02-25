import React from "react";

const horarios = [
    { inicio: "17:00", fim: "17:50" },
    { inicio: "17:50", fim: "18:40" },
    { inicio: "18:40", fim: "19:30" },
    { inicio: "19:30", fim: "20:20" },
    { inicio: "20:20", fim: "21:10" },
    { inicio: "21:10", fim: "22:00" },
];

export const TabelaAlocacoesGerais = ({ alocacoes }) => {
    return (
        <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
                <tr>
                    <th>Sala</th>
                    {horarios.map((horario) => (
                        <th key={horario.inicio}>{`${horario.inicio} - ${horario.fim}`}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {alocacoes.map((sala) => (
                    <tr key={sala.id}>
                        <td><strong>{sala.nome}</strong></td>
                        {horarios.map((intervalo) => {
                            const alocacao = sala.aulas.find(
                                (aula) =>
                                    aula.horarioInicio >= intervalo.inicio &&
                                    aula.horarioInicio < intervalo.fim
                            );

                            return (
                                <td key={`${sala.id}-${intervalo.inicio}`}>
                                    {alocacao ? (
                                        <div>
                                            <strong>{alocacao.disciplina.codigoTurma} - {alocacao.disciplina.nome}</strong>
                                            <br />
                                            <small>{alocacao.disciplina.nomeProfessor}</small>
                                        </div>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
