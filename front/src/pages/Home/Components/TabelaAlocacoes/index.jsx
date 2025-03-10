// components/TabelaAlocacoes.js
import React, { useEffect } from 'react';

const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
const horarios = [
  { inicio: '17:00', fim: '17:50' },
  { inicio: '17:50', fim: '18:40' },
  { inicio: '18:40', fim: '19:30' },
  { inicio: '19:30', fim: '20:20' },
  { inicio: '20:20', fim: '21:10' },
  { inicio: '21:10', fim: '22:00' },
];

export const TabelaAlocacoes = ({ alocacoes }) => {
  useEffect(() => {
    renderTabela();
  }, [alocacoes]);
  const renderTabela = () => {
    return horarios.map((intervalo) => (
      <tr key={`${intervalo.inicio}-${intervalo.fim}`}>
        <td>{`${intervalo.inicio} até ${intervalo.fim}`}</td>
        {diasSemana.map((dia) => {
          const alocacao = alocacoes.find(
            (a) =>
              a.diaSemana === dia.split('-')[0].toUpperCase() &&
              a.horarioInicio >= intervalo.inicio &&
              a.horarioInicio < intervalo.fim
          );

          return (
            <td key={dia}>
              {alocacao ? (
                <>
                  <div><strong>{alocacao.disciplina.codigoTurma + ' - ' + alocacao.disciplina.nome}</strong></div>
                  <div>{alocacao.sala.codigo + ' - ' + alocacao.sala.nome}</div>
                </>
              ) : (
                <span>Sem aula</span>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <table className="table table-bordered table-striped text-center">
      <thead className="table-dark">
        <tr>
          <th>Horário</th>
          {diasSemana.map((dia) => (
            <th key={dia}>{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTabela()}</tbody>
    </table>
  );
};
