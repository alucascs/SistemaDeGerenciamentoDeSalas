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

import ifba.edu.br.alocacao.dtos.SalaDTO;
import ifba.edu.br.alocacao.services.SalaService;

@RestController
@RequestMapping("/salas")
public class SalaController {
    private final SalaService salaService;

    public SalaController(SalaService salaService) {
        this.salaService = salaService;
    }

    @PostMapping
    public SalaDTO create(@RequestBody SalaDTO dto) {
        return salaService.save(dto);
    }

    @GetMapping
    public List<SalaDTO> getAll() {
        return salaService.findAll();
    }

    @PutMapping
    public SalaDTO update(@RequestBody SalaDTO dto) {
        return salaService.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
