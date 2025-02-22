package ifba.edu.br.alocacao.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
public class AulaController {
    private final AulaService aulaService;

    public AulaController(AulaService aulaService) {
        this.aulaService = aulaService;
    }

    @PostMapping
    public AulaDTO alocarAula(@RequestBody AulaDTO dto) {
        return aulaService.alocarAula(dto);
    }

    @GetMapping
    public List<AulaDTO> listarAulas() {
        return aulaService.listarAulas();
    }
    
    @PostMapping("/listarPorDisciplinas")
    public List<AulaDTO> listarAulasPorDisciplinas(@RequestBody List<Long> disciplinasIds) {
        return aulaService.listarAulasPorDisciplinas(disciplinasIds);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAula(@PathVariable Long id) {
        aulaService.excluirAula(id);
        return ResponseEntity.noContent().build();
    }
}