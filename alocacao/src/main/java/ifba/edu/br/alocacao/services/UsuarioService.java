package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.repository.DisciplinaRepository;
import ifba.edu.br.alocacao.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioDTO save(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.email());
        usuario.setPassword(dto.password());
        usuario.setRole(dto.role());
        return new UsuarioDTO(usuarioRepository.save(usuario));
    }

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream().map(UsuarioDTO::new).collect(Collectors.toList());
    }

    public UsuarioDTO update(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setId(dto.id());
        usuario.setEmail(dto.email());
        usuario.setPassword(dto.password());
        usuario.setRole(dto.role());
        return new UsuarioDTO(usuarioRepository.save(usuario));
    }

    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
    
    public List<DisciplinaDTO> getDisciplinasByUsuario(Long usuarioId) {
		Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
		return usuario.getDisciplinas().stream().map(DisciplinaDTO::new).collect(Collectors.toList());
	}
}