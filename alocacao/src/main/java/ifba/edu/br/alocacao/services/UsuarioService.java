package ifba.edu.br.alocacao.services;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.entities.Role;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.exceptions.NotFoundException;
import ifba.edu.br.alocacao.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioDTO save(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.email());
        usuario.setPassword(passwordEncoder.encode(dto.password()));
        usuario.setRole(dto.role());
        usuario.setNome(dto.nome());
        return new UsuarioDTO(usuarioRepository.save(usuario));
    }

    @Transactional
    public UsuarioDTO update(UsuarioDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.id())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + dto.id()));

        usuario.setEmail(dto.email());

        if (dto.password() != null && !dto.password().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(dto.password()));
        }

        usuario.setRole(dto.role());
        usuario.setNome(dto.nome());

        return new UsuarioDTO(usuarioRepository.save(usuario));
    }

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioDTO::new)
                .toList();
    }

    @Transactional
    public void delete(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new NotFoundException("Usuário não encontrado com ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public List<DisciplinaDTO> getDisciplinasByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + usuarioId));

        return usuario.getDisciplinas().stream()
                .map(DisciplinaDTO::new)
                .toList();
    }

    public List<UsuarioDTO> findAllProfessores() {
        return usuarioRepository.findByRole(Role.PROFESSOR).stream()
                .map(UsuarioDTO::new)
                .toList();
    }
}
