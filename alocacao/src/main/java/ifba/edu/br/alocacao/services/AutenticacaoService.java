package ifba.edu.br.alocacao.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.repository.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService{

	private UsuarioRepository usuarioRepository;
	
	public AutenticacaoService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return usuarioRepository.findByEmail(email);
	}

}
