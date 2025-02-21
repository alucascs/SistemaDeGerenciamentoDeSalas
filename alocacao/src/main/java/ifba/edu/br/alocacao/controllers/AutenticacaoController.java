package ifba.edu.br.alocacao.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ifba.edu.br.alocacao.dtos.DadosAutenticacao;
import ifba.edu.br.alocacao.dtos.DadosToken;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.services.JWTokenService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") 
public class AutenticacaoController {
	private AuthenticationManager manager;
	private JWTokenService tokenService;

	public AutenticacaoController(AuthenticationManager manager, JWTokenService tokenService) {
		this.manager = manager;
		this.tokenService = tokenService;
	}

	@PostMapping("/login")
	public ResponseEntity<DadosToken> efetuarLogin(@RequestBody DadosAutenticacao dados) {
		var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
		var autentication = manager.authenticate(authenticationToken);
		var token = tokenService.gerarToken((Usuario) autentication.getPrincipal());
		return ResponseEntity.ok(new DadosToken(token, new UsuarioDTO((Usuario) autentication.getPrincipal())));
	}
}
