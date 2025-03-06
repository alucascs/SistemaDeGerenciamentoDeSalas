package ifba.edu.br.alocacao.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ifba.edu.br.alocacao.dtos.SalaComAulasDTO;
import ifba.edu.br.alocacao.dtos.SalaDTO;
import ifba.edu.br.alocacao.entities.DiaDaSemana;
import ifba.edu.br.alocacao.services.SalaService;

@RestController
@RequestMapping("/salas")
@CrossOrigin(origins = "*")
public class SalaController {
	private final SalaService salaService;

	public SalaController(SalaService salaService) {
		this.salaService = salaService;
	}

	 @Secured("PROFESSOR")
	@PostMapping
	public ResponseEntity<SalaDTO> create(@RequestBody SalaDTO dto) {
		SalaDTO created = salaService.save(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@GetMapping
	public ResponseEntity<List<SalaDTO>> getAll() {
		List<SalaDTO> salas = salaService.findAll();
		if (salas.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(salas);
	}

	@GetMapping("/{id}")
	public ResponseEntity<SalaDTO> getByID(@PathVariable Long id) {
		SalaDTO sala = salaService.findByID(id);
		return ResponseEntity.ok(sala);
	}

	@GetMapping("/aulas/{diaSemana}")
	public ResponseEntity<List<SalaComAulasDTO>> getSalasComAulas(@PathVariable DiaDaSemana diaSemana) {
		List<SalaComAulasDTO> salas = salaService.getSalasComAulasPorDia(diaSemana);
		if (salas.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(salas);
	}

	@Secured("PROFESSOR")
	@PutMapping
	public ResponseEntity<SalaDTO> update(@RequestBody SalaDTO dto) {
		SalaDTO updated = salaService.update(dto);
		return ResponseEntity.ok(updated);
	}
	@Secured("PROFESSOR")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		salaService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
