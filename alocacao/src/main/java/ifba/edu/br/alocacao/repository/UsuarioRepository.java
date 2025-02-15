package ifba.edu.br.alocacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import ifba.edu.br.alocacao.entities.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	public UserDetails findByEmail(String email);
}
