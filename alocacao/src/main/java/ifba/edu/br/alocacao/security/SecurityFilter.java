package ifba.edu.br.alocacao.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import ifba.edu.br.alocacao.repository.UsuarioRepository;
import ifba.edu.br.alocacao.services.JWTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

	private JWTokenService tokenService;
	private UsuarioRepository usuarioRepository;

	public SecurityFilter(JWTokenService tokenService, UsuarioRepository usuarioRepository) {
		this.tokenService = tokenService;
		this.usuarioRepository = usuarioRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Verifique se a requisição é para o login e ignore o processamento do token
		if (request.getRequestURI().startsWith("/auth/login")) {
			filterChain.doFilter(request, response);
			return; // Não faz mais nada para a requisição de login
		}

		var token = recuperarToken(request);
		System.out.println("Token: " + token);
		if (token != null) {
			var email = tokenService.getSubject(token);
			var usuario = usuarioRepository.findByEmail(email);
			var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}

	public String recuperarToken(HttpServletRequest request) {
		var token = request.getHeader("Authorization");
		if (token == null || token.isEmpty() || !token.startsWith("Bearer ")) {
			return null;
		}
		return token.replace("Bearer ", "");
	}

}
