package ifba.edu.br.alocacao.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
public class DisciplinaController {
    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping
    public DisciplinaDTO create(@RequestBody DisciplinaDTO dto) {
        return disciplinaService.save(dto);
    }

    @GetMapping
    public List<DisciplinaDTO> getAll() {
        return disciplinaService.findAll();
    }

    @PutMapping
    public DisciplinaDTO update(@RequestBody DisciplinaDTO dto) {
        return disciplinaService.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        disciplinaService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{disciplinaId}/usuarios/{usuarioId}")
    public DisciplinaDTO vincularUsuario(@PathVariable Long disciplinaId, @PathVariable Long usuarioId) {
        return disciplinaService.vincularUsuario(disciplinaId, usuarioId);
    }
    
    @DeleteMapping("/{disciplinaId}/usuarios/{usuarioId}")
    public DisciplinaDTO desvincularUsuario(@PathVariable Long disciplinaId, @PathVariable Long usuarioId) {
        return disciplinaService.desvincularUsuario(disciplinaId, usuarioId);
    }
    
    @GetMapping("/{id}/usuarios")
    public List<UsuarioDTO> getUsuariosByDisciplina(@PathVariable Long id) {
        return disciplinaService.getUsuariosByDisciplina(id);
    }
}
