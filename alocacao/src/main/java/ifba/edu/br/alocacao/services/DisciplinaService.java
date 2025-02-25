package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.repository.DisciplinaRepository;
import ifba.edu.br.alocacao.repository.UsuarioRepository;

@Service
public class DisciplinaService {
	private final DisciplinaRepository disciplinaRepository;
	private final UsuarioRepository usuarioRepository;

	public DisciplinaService(DisciplinaRepository disciplinaRepository, UsuarioRepository usuarioRepository) {
		this.disciplinaRepository = disciplinaRepository;
		this.usuarioRepository = usuarioRepository;
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

	public DisciplinaDTO getByID(long id) {
		return disciplinaRepository.findById(id)
			.map(DisciplinaDTO::new)
			.orElse(null); // Ou pode lançar uma exceção se o ID não for encontrado
	}
	


	public ResponseEntity<DisciplinaDTO> update(DisciplinaDTO dto) {
		Disciplina disciplina = new Disciplina();
		disciplina.setId(dto.id());
		disciplina.setNome(dto.nome());
		disciplina.setCodigoTurma(dto.codigoTurma());
		disciplina.setNomeProfessor(dto.nomeProfessor());
		return ResponseEntity.ok(new DisciplinaDTO(disciplinaRepository.save(disciplina)));
	}

	public void delete(Long id) {
		disciplinaRepository.deleteById(id);
	}
	
	public DisciplinaDTO vincularUsuario(Long disciplinaId, Long usuarioId) {
        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        disciplina.getUsuarios().add(usuario);
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }
	
	public DisciplinaDTO desvincularUsuario(Long disciplinaId, Long usuarioId) {
        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        disciplina.getUsuarios().remove(usuario);
        return new DisciplinaDTO(disciplinaRepository.save(disciplina));
    }

	
	public List<UsuarioDTO> getUsuariosByDisciplina(Long disciplinaId) {
        Disciplina disciplina = disciplinaRepository.findById(disciplinaId).orElseThrow();
        return disciplina.getUsuarios().stream().map(UsuarioDTO::new).collect(Collectors.toList());
    }
}
