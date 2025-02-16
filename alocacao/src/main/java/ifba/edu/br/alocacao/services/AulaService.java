package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.AulaDTO;
import ifba.edu.br.alocacao.entities.Aula;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.entities.Sala;
import ifba.edu.br.alocacao.repository.AulaRepository;
import ifba.edu.br.alocacao.repository.DisciplinaRepository;
import ifba.edu.br.alocacao.repository.SalaRepository;

@Service
public class AulaService {
    private final AulaRepository aulaRepository;
    private final SalaRepository salaRepository;
    private final DisciplinaRepository disciplinaRepository;
    
    public AulaService(AulaRepository aulaRepository, SalaRepository salaRepository, DisciplinaRepository disciplinaRepository) {
        this.aulaRepository = aulaRepository;
        this.salaRepository = salaRepository;
        this.disciplinaRepository = disciplinaRepository;
    }

    public AulaDTO alocarAula(AulaDTO dto) {
    	Disciplina disciplina = disciplinaRepository.findById(dto.disciplinaId())
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        Sala sala = salaRepository.findById(dto.salaId())
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        if (conflitoDeHorario(dto)) {
            throw new RuntimeException("Conflito de horário detectado");
        }
        Aula aula = new Aula(null, disciplina, sala, dto.diaSemana(), dto.horarioInicio(), dto.duracao());
        return new AulaDTO(aulaRepository.save(aula));
    }

    public List<AulaDTO> listarAulas() {
        return aulaRepository.findAll().stream().map(AulaDTO::new).collect(Collectors.toList());
    }

    public void excluirAula(Long id) {
        aulaRepository.deleteById(id);
    }

    private boolean conflitoDeHorario(AulaDTO dto) {
        List<Aula> aulasNaSala = aulaRepository.findAll();
        
        return aulasNaSala.stream().anyMatch(a -> 
            a.getSala().getId().equals(dto.salaId()) &&
            a.getDiaSemana().equals(dto.diaSemana()) &&
            ((dto.horarioInicio().isAfter(a.getHorarioInicio()) && dto.horarioInicio().isBefore(a.getHorarioInicio().plusMinutes(a.getDuracao()))) ||
             (a.getHorarioInicio().isAfter(dto.horarioInicio()) && a.getHorarioInicio().isBefore(dto.horarioInicio().plusMinutes(dto.duracao()))))
        );
    }
}