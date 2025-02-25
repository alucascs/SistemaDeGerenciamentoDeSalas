package ifba.edu.br.alocacao.services;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.entities.Role;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.repository.UsuarioRepository;

@Service
public class UsuarioService {
	private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder passwordEncoder;

	public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
		this.usuarioRepository = usuarioRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public UsuarioDTO save(UsuarioDTO dto) {
		Usuario usuario = new Usuario();
		usuario.setEmail(dto.email());
		usuario.setPassword(passwordEncoder.encode(dto.password()));
		usuario.setRole(dto.role());
		usuario.setNome(dto.nome());
		return new UsuarioDTO(usuarioRepository.save(usuario));
	}

	public UsuarioDTO update(UsuarioDTO dto) {
		Usuario usuario = usuarioRepository.findById(dto.id()).orElseThrow();
		usuario.setEmail(dto.email());

		if (dto.password() != null && !dto.password().isEmpty()) {
			usuario.setPassword(passwordEncoder.encode(dto.password()));
		}

		usuario.setRole(dto.role());
		return new UsuarioDTO(usuarioRepository.save(usuario));
	}

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream().map(UsuarioDTO::new).toList();
    }


    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
    
    public List<DisciplinaDTO> getDisciplinasByUsuario(Long usuarioId) {
		Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
		return usuario.getDisciplinas().stream().map(DisciplinaDTO::new).toList();
	}

	public List<UsuarioDTO> findAllProfessores() {
		return usuarioRepository.findByRole(Role.PROFESSOR).stream().map(UsuarioDTO::new).toList();
	}
}