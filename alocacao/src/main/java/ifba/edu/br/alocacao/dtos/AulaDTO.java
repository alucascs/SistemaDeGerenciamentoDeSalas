package ifba.edu.br.alocacao.dtos;

import java.time.LocalTime;

import ifba.edu.br.alocacao.entities.Aula;
import ifba.edu.br.alocacao.entities.DiaDaSemana;

public record AulaDTO(Long id, DisciplinaDTO disciplina, SalaDTO sala, DiaDaSemana diaSemana, LocalTime horarioInicio, int duracao) {
    public AulaDTO(Aula aula) {
        this(aula.getId(), new DisciplinaDTO(aula.getDisciplina()), new SalaDTO(aula.getSala()), aula.getDiaSemana(), aula.getHorarioInicio(), aula.getDuracao());
    }
}