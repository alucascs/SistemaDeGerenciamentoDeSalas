package ifba.edu.br.alocacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import ifba.edu.br.alocacao.entities.Role;
import ifba.edu.br.alocacao.entities.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	public UserDetails findByEmail(String email);
	public List<Usuario> findByRole(Role role);
}
