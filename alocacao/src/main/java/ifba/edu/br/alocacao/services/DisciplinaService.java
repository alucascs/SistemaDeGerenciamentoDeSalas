package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.repository.DisciplinaRepository;

@Service
public class DisciplinaService {
    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public DisciplinaDTO save(DisciplinaDTO dto) {
        Disciplina disciplina = new Disciplina();
        disciplina.setNome(dto.nome());
        disciplina.setCodigoTurma(dto.codigoTurma());
        disciplina.setNomeProfessor(dto.nomeProfessor());
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

    public List<DisciplinaDTO> findAll() {
        return disciplinaRepository.findAll().stream().map(DisciplinaDTO::new).collect(Collectors.toList());
    }

    public DisciplinaDTO update(DisciplinaDTO dto) {
        Disciplina disciplina = new Disciplina();
        disciplina.setId(dto.id());
        disciplina.setNome(dto.nome());
        disciplina.setCodigoTurma(dto.codigoTurma());
        disciplina.setNomeProfessor(dto.nomeProfessor());
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

    public void delete(Long id) {
        disciplinaRepository.deleteById(id);
    }
}
