package ifba.edu.br.alocacao.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ifba.edu.br.alocacao.dtos.AulaDTO;
import ifba.edu.br.alocacao.services.AulaService;

@RestController
@RequestMapping("/aulas")
@CrossOrigin(origins = "*") 
public class AulaController {

    private final AulaService aulaService;

    public AulaController(AulaService aulaService) {
        this.aulaService = aulaService;
    }

    @PostMapping
    public ResponseEntity<AulaDTO> alocarAula(@RequestBody AulaDTO dto) {
        AulaDTO aula = aulaService.alocarAula(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(aula); 
    }

    @GetMapping
    public ResponseEntity<List<AulaDTO>> listarAulas() {
        List<AulaDTO> aulas = aulaService.listarAulas();
        if (aulas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(aulas);
    }

    @PostMapping("/listarPorDisciplinas")
    public ResponseEntity<List<AulaDTO>> listarAulasPorDisciplinas(@RequestBody List<Long> disciplinasIds) {
        List<AulaDTO> aulas = aulaService.listarAulasPorDisciplinas(disciplinasIds);
        if (aulas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(aulas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAula(@PathVariable Long id) {
        aulaService.excluirAula(id);
        return ResponseEntity.noContent().build();
    }
}
