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
    public UsuarioDTO create(@RequestBody UsuarioDTO dto) {
        return usuarioService.save(dto);
    }

    @GetMapping
    public List<UsuarioDTO> getAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/professores")
    public List<UsuarioDTO> getProfessores() {
        return usuarioService.findAllProfessores();
    }
    
    @PutMapping
    public UsuarioDTO update(@RequestBody UsuarioDTO dto) {
        return usuarioService.update(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}/disciplinas")
    public List<DisciplinaDTO> getDisciplinasByUsuario(@PathVariable Long id) {
        return usuarioService.getDisciplinasByUsuario(id);
    }
}