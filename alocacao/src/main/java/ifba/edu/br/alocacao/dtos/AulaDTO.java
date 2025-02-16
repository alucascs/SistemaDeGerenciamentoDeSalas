package ifba.edu.br.alocacao.dtos;

import java.time.LocalTime;

import ifba.edu.br.alocacao.entities.Aula;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.entities.Sala;

public record AulaDTO(Long id, Long disciplinaId, Long salaId, String diaSemana, LocalTime horarioInicio, int duracao) {
    public AulaDTO(Aula aula) {
        this(aula.getId(), aula.getDisciplina().getId(), aula.getSala().getId(), aula.getDiaSemana(), aula.getHorarioInicio(), aula.getDuracao());
    }
}