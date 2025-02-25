import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const TabelaAlocacoesGerais = ({ alocacoes }) => {
    const [searchText, setSearchText] = useState('');
    const horarios = [
        { inicio: '17:00', fim: '17:50' },
        { inicio: '17:50', fim: '18:40' },
        { inicio: '18:40', fim: '19:30' },
        { inicio: '19:30', fim: '20:20' },
        { inicio: '20:20', fim: '21:10' },
        { inicio: '21:10', fim: '22:00' },
    ];

    // Função para remover acentuação
    const removerAcentuacao = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const processarAlocacoes = (alocacoes) => {
        return alocacoes.map(sala => ({
            ...sala,
            aulas: horarios.map(horario => {
                const aula = sala.aulas.find(a => a.horarioInicio.startsWith(horario.inicio));
                return aula ? `${aula.disciplina.codigoTurma} - ${aula.disciplina.nome}` : 'Sem aula';
            }),
        }));
    };

    const filteredData = alocacoes.filter(sala => {
        const nomeSala = removerAcentuacao(sala.nome.toLowerCase());
        const textoPesquisa = removerAcentuacao(searchText.toLowerCase());

        if (nomeSala.includes(textoPesquisa)) {
            return true;
        }

        return horarios.some(horario => {
            const indexHorario = horarios.indexOf(horario);
            let aula = sala.aulas[indexHorario];
            aula = typeof aula !== 'undefined' ? aula.codigoTurma + ' - ' + aula.disciplina.nome : 'Sem aula';
            return removerAcentuacao(aula.toLowerCase()).includes(textoPesquisa);
        });
    });

    const columns = [
        {
            name: 'Sala',
            selector: row => row.nome,
            sortable: true,
            wrap: true,
        },
        ...horarios.map(horario => ({
            name: `${horario.inicio} até ${horario.fim}`,
            selector: row => row.aulas[horarios.indexOf(horario)],
            sortable: true,
            wrap: true,
        })),
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
                borderBottom: '1px solid #dee2e6',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                padding: '8px',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
            },
        },
    };

    const alocacoesProcessadas = processarAlocacoes(filteredData);

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todas',
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={alocacoesProcessadas}
                customStyles={customStyles}
                pagination
                paginationComponentOptions={paginationOptions}
                fixedHeader
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="form-control w-25"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                }
                responsive={true}
                highlightOnHover={true}
            />
        </div>
    );
};

export default TabelaAlocacoesGerais;
