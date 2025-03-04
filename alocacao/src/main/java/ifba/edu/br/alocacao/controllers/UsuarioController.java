package ifba.edu.br.alocacao.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ifba.edu.br.alocacao.dtos.DisciplinaDTO;
import ifba.edu.br.alocacao.dtos.UsuarioDTO;
import ifba.edu.br.alocacao.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
	private final UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@PostMapping("/cadastro")
	public ResponseEntity<UsuarioDTO> create(@RequestBody UsuarioDTO dto) {
		UsuarioDTO created = usuarioService.save(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@GetMapping
	public ResponseEntity<List<UsuarioDTO>> getAll() {
		List<UsuarioDTO> usuarios = usuarioService.findAll();
		if (usuarios.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(usuarios);
	}

	@GetMapping("/professores")
	public ResponseEntity<List<UsuarioDTO>> getProfessores() {
		List<UsuarioDTO> professores = usuarioService.findAllProfessores();
		if (professores.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(professores);
	}

	@PutMapping
	public ResponseEntity<UsuarioDTO> update(@RequestBody UsuarioDTO dto) {
		UsuarioDTO updated = usuarioService.update(dto);
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		usuarioService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/{id}/disciplinas")
	public ResponseEntity<List<DisciplinaDTO>> getDisciplinasByUsuario(@PathVariable Long id) {
		List<DisciplinaDTO> disciplinas = usuarioService.getDisciplinasByUsuario(id);
		if (disciplinas.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(disciplinas);
	}
}
