package ifba.edu.br.alocacao.dtos;

import ifba.edu.br.alocacao.entities.Role;
import ifba.edu.br.alocacao.entities.Usuario;

public record UsuarioDTO(Long id, String email, String password, Role role, String nome) {
    public UsuarioDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getEmail(), usuario.getPassword(), usuario.getRole(),usuario.getNome());
    }
}