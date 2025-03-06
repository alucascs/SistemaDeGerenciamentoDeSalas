package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.AulaDTO;
import ifba.edu.br.alocacao.entities.Aula;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.entities.Sala;
import ifba.edu.br.alocacao.exceptions.BusinessException;
import ifba.edu.br.alocacao.exceptions.NotFoundException;
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
        Disciplina disciplina = disciplinaRepository.findById(dto.disciplina().id())
                .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + dto.disciplina().id()));

        Sala sala = salaRepository.findById(dto.sala().id())
                .orElseThrow(() -> new NotFoundException("Sala não encontrada com ID: " + dto.sala().id()));

        if (conflitoDeHorario(dto)) {
            throw new BusinessException("Conflito de horário detectado para a sala informada.");
        }

        Aula aula = new Aula(null, disciplina, sala, dto.diaSemana(), dto.horarioInicio(), dto.duracao());
        return new AulaDTO(aulaRepository.save(aula));
    }

    public List<AulaDTO> listarAulas() {
        List<Aula> aulas = aulaRepository.findAll();
        return aulas.stream().map(AulaDTO::new).collect(Collectors.toList());
    }

    public List<AulaDTO> listarAulasPorDisciplinas(List<Long> disciplinasIds) {
        if (disciplinasIds == null || disciplinasIds.isEmpty()) {
            throw new BusinessException("A lista de IDs de disciplinas não pode ser vazia.");
        }

        List<Aula> aulas = aulaRepository.findByDisciplinaIdIn(disciplinasIds);
        return aulas.stream().map(AulaDTO::new).toList();
    }

    public void excluirAula(Long id) {
        if (!aulaRepository.existsById(id)) {
            throw new NotFoundException("Aula não encontrada com ID: " + id);
        }
        aulaRepository.deleteById(id);
    }

    public AulaDTO buscarAulaPorId(Long id) {
        Aula aula = aulaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aula não encontrada com ID: " + id));
        return new AulaDTO(aula);
    }

    public AulaDTO atualizarAula(AulaDTO dto) {
        if(conflitoDeHorario(dto)){
            throw new BusinessException("Conflito de horário detectado para a sala informada.");
        }       
        Aula aula = aulaRepository.findById(dto.id())
                .orElseThrow(() -> new NotFoundException("Aula não encontrada com ID: " + dto.id()));
    
        Disciplina disciplina = disciplinaRepository.findById(dto.disciplina().id())
                .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + dto.disciplina().id()));
    
        Sala sala = salaRepository.findById(dto.sala().id())
                .orElseThrow(() -> new NotFoundException("Sala não encontrada com ID: " + dto.sala().id()));
        
    
        aula.setDisciplina(disciplina);
        aula.setSala(sala);
        aula.setDiaSemana(dto.diaSemana());
        aula.setHorarioInicio(dto.horarioInicio());
        aula.setDuracao(dto.duracao());
        
        Aula aulaAtualizada = aulaRepository.save(aula);
        return new AulaDTO(aulaAtualizada);
    }
    

    private boolean conflitoDeHorario(AulaDTO dto) {
        List<Aula> aulasNaSala = aulaRepository.findAll();

        return aulasNaSala.stream().anyMatch(a -> 
            a.getSala().getId().equals(dto.sala().id()) &&
            a.getDiaSemana().equals(dto.diaSemana()) &&
            (
                (dto.horarioInicio().isBefore(a.getHorarioInicio().plusMinutes(a.getDuracao())) && 
                dto.horarioInicio().plusMinutes(dto.duracao()).isAfter(a.getHorarioInicio()))
            )
        );
    }
}
