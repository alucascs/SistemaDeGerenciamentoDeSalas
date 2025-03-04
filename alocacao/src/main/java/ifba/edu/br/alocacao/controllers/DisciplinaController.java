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
import ifba.edu.br.alocacao.services.DisciplinaService;

@RestController
@RequestMapping("/disciplinas")
@CrossOrigin(origins = "*")
public class DisciplinaController {
    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping
    public ResponseEntity<DisciplinaDTO> create(@RequestBody DisciplinaDTO dto) {
        DisciplinaDTO created = disciplinaService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<DisciplinaDTO>> getAll() {
        List<DisciplinaDTO> disciplinas = disciplinaService.findAll();
        if (disciplinas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(disciplinas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisciplinaDTO> getByID(@PathVariable Long id) {
        DisciplinaDTO dto = disciplinaService.getByID(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    public ResponseEntity<DisciplinaDTO> update(@RequestBody DisciplinaDTO dto) {
        DisciplinaDTO updated = disciplinaService.update(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        disciplinaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{disciplinaId}/usuarios/{usuarioId}")
    public ResponseEntity<DisciplinaDTO> vincularUsuario(@PathVariable Long disciplinaId, @PathVariable Long usuarioId) {
        DisciplinaDTO updated = disciplinaService.vincularUsuario(disciplinaId, usuarioId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{disciplinaId}/usuarios/{usuarioId}")
    public ResponseEntity<DisciplinaDTO> desvincularUsuario(@PathVariable Long disciplinaId, @PathVariable Long usuarioId) {
        DisciplinaDTO updated = disciplinaService.desvincularUsuario(disciplinaId, usuarioId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}/usuarios")
    public ResponseEntity<List<UsuarioDTO>> getUsuariosByDisciplina(@PathVariable Long id) {
        List<UsuarioDTO> usuarios = disciplinaService.getUsuariosByDisciplina(id);
        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(usuarios);
    }
}

