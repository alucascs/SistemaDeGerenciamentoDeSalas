package ifba.edu.br.alocacao.dtos;

import ifba.edu.br.alocacao.entities.Disciplina;

public record DisciplinaDTO(Long id, String nome, String codigoTurma, String nomeProfessor) {
    public DisciplinaDTO(Disciplina disciplina) {
        this(disciplina.getId(), disciplina.getNome(), disciplina.getCodigoTurma(), disciplina.getNomeProfessor());
    }
}