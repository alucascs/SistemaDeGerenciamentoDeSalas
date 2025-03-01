package ifba.edu.br.alocacao.controllers;

import java.util.List;

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

    @PostMapping
    public SalaDTO create(@RequestBody SalaDTO dto) {
        return salaService.save(dto);
    }

    @GetMapping
    public List<SalaDTO> getAll() {
        return salaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalaDTO> getByID(@PathVariable Long id) {
        return salaService.findByID(id);
    }
    
    @GetMapping("/aulas/{diaSemana}")
    public ResponseEntity<List<SalaComAulasDTO>> getSalasComAulas(@PathVariable DiaDaSemana diaSemana) {
        List<SalaComAulasDTO> salas = salaService.getSalasComAulasPorDia(diaSemana);
        return ResponseEntity.ok(salas);
    }
    
    @PutMapping
    public ResponseEntity<SalaDTO> update(@RequestBody SalaDTO dto) {
        return salaService.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
