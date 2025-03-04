package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.entities.Aula;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.exceptions.BusinessException;
import ifba.edu.br.alocacao.exceptions.NotFoundException;
import ifba.edu.br.alocacao.repository.AulaRepository;
import ifba.edu.br.alocacao.repository.DisciplinaRepository;
import ifba.edu.br.alocacao.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class DisciplinaService {
    private final DisciplinaRepository disciplinaRepository;
    private final UsuarioRepository usuarioRepository;
    private final AulaRepository aulaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository, UsuarioRepository usuarioRepository, AulaRepository aulaRepository) {
        this.disciplinaRepository = disciplinaRepository;
        this.usuarioRepository = usuarioRepository;
        this.aulaRepository = aulaRepository;
    }

    public DisciplinaDTO save(DisciplinaDTO dto) {
        Disciplina disciplina = new Disciplina();
        disciplina.setNome(dto.nome());
        disciplina.setCodigoTurma(dto.codigoTurma());
        disciplina.setNomeProfessor(dto.nomeProfessor());
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

    public List<DisciplinaDTO> findAll() {
        return disciplinaRepository.findAll()
                .stream()
                .map(DisciplinaDTO::new)
                .collect(Collectors.toList());
    }

    public DisciplinaDTO getByID(long id) {
        return disciplinaRepository.findById(id)
                .map(DisciplinaDTO::new)
                .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + id));
    }

    public DisciplinaDTO update(DisciplinaDTO dto) {
        if (!disciplinaRepository.existsById(dto.id())) {
            throw new NotFoundException("Disciplina não encontrada com ID: " + dto.id());
        }

        Disciplina disciplina = new Disciplina();
        disciplina.setId(dto.id());
        disciplina.setNome(dto.nome());
        disciplina.setCodigoTurma(dto.codigoTurma());
        disciplina.setNomeProfessor(dto.nomeProfessor());
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

    @Transactional
    public void delete(Long id) {
        Disciplina disciplina = disciplinaRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + id));
        
        disciplina.getUsuarios().clear();
        disciplinaRepository.save(disciplina);
        
        List<Aula> aulas = aulaRepository.findByDisciplinaId(id);
        aulaRepository.deleteAll(aulas);
        
        disciplinaRepository.deleteById(id);
    }


    public DisciplinaDTO vincularUsuario(Long disciplinaId, Long usuarioId) {
        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + disciplinaId));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + usuarioId));

        if (disciplina.getUsuarios().contains(usuario)) {
            throw new BusinessException("Usuário já vinculado à disciplina.");
        }

        disciplina.getUsuarios().add(usuario);
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

    public DisciplinaDTO desvincularUsuario(Long disciplinaId, Long usuarioId) {
        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + disciplinaId));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + usuarioId));

        if (!disciplina.getUsuarios().contains(usuario)) {
            throw new BusinessException("Usuário não está vinculado à disciplina.");
        }

        disciplina.getUsuarios().remove(usuario);
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

    public List<UsuarioDTO> getUsuariosByDisciplina(Long disciplinaId) {
        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new NotFoundException("Disciplina não encontrada com ID: " + disciplinaId));

        return disciplina.getUsuarios()
                .stream()
                .map(UsuarioDTO::new)
                .collect(Collectors.toList());
    }
}

