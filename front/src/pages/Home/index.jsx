import React, { useEffect, useState } from 'react';

function Home() {
    const [alocacoes, setAlocacoes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        // Simulando a requisição de dados da alocação
        // Isso seria substituido requisição real
        const GetDisciplinasUsuario = async () => {

            const data = [
                {
                    id: 1,
                    nome: 'Matemática',
                    codigoTurma: '2025.1',
                    professor: 'zézinho'
                },
                {
                    id: 1,
                    nome: 'Lógica de Programação',
                    codigoTurma: '2025.1',
                    professor: 'jorginho'
                },
                {
                    id: 1,
                    nome: 'Química',
                    codigoTurma: '2025.1',
                    professor: 'mariazinha'
                }                
            ]
            setDisciplinas(data);
        };

        GetDisciplinasUsuario();
    }, []);

    useEffect(()=>{
        const getAlocacoes = async ()=>{
            const data = [
                {
                    disciplina: 'Matemática',
                    sala: '101',
                    horario: '17:00',
                    diaSemana: 'Segunda-feira',
                },
                {
                    disciplina: 'Matemática',
                    sala: '101',
                    horario: '17:50',
                    diaSemana: 'Segunda-feira',
                },
                {
                    disciplina: 'Lógica de Programação',
                    sala: '102',
                    horario: '18:40',
                    diaSemana: 'Terça-feira',
                },
                {
                    disciplina: 'Lógica de Programação',
                    sala: '102',
                    horario: '19:30',
                    diaSemana: 'Terça-feira',
                },
                {
                    disciplina: 'Química',
                    sala: '103',
                    horario: '20:20',
                    diaSemana: 'Quarta-feira',
                },
                {
                    disciplina: 'Química',
                    sala: '103',
                    horario: '21:10',
                    diaSemana: 'Quarta-feira',
                },
            ];

            setAlocacoes(data);
        }
        getAlocacoes();
    },[disciplinas]);

    // Estrutura dos dias da semana e horários (intervalos)
    const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
    const horarios = [
        { inicio: '17:00', fim: '17:50' },
        { inicio: '17:50', fim: '18:40' },
        { inicio: '18:40', fim: '19:30' },
        { inicio: '19:30', fim: '20:20' },
        { inicio: '20:20', fim: '21:10' },
        { inicio: '21:10', fim: '22:00' },
    ];

    const renderTabela = () => {
        return horarios.map((intervalo) => (
            <tr key={`${intervalo.inicio}-${intervalo.fim}`}>
                <td>{`${intervalo.inicio} até ${intervalo.fim}`}</td>
                {diasSemana.map((dia) => {
                    const alocacao = alocacoes.find(
                        (a) =>
                            a.diaSemana === dia &&
                            a.horario >= intervalo.inicio &&
                            a.horario < intervalo.fim
                    );

                    return (
                        <td key={dia}>
                            {alocacao ? (
                                <>
                                    <div><strong>{alocacao.disciplina}</strong></div>
                                    <div>{alocacao.sala}</div>
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
        <div className='container'>
            <div className='col-lg-8 col-md-12 col-sm-12'>
                <h1>Minhas Disciplinas</h1>
                <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Horário</th>
                            {diasSemana.map((dia) => (
                                <th key={dia}>{dia}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{renderTabela()}</tbody>
                </table>
            </div>
            <div className='col-lg-4 col-md-12 col-sm-12'>
                <h3>Minhas Disciplinas:</h3>
                <ul>
                    {disciplinas.map((disc) => (
                        <div><li>{disc.nome}</li>
                        <button><i className='bi bi-trash'></i></button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
} export default Home;
