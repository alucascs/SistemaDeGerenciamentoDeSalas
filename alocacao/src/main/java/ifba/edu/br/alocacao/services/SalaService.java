package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.AulaDTO;
import ifba.edu.br.alocacao.dtos.SalaComAulasDTO;
import ifba.edu.br.alocacao.dtos.SalaDTO;
import ifba.edu.br.alocacao.entities.DiaDaSemana;
import ifba.edu.br.alocacao.entities.Sala;
import ifba.edu.br.alocacao.repository.SalaRepository;
import jakarta.transaction.Transactional;

@Service
public class SalaService {
    private final SalaRepository salaRepository;

    public SalaService(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    @Transactional
    public SalaDTO save(SalaDTO dto) {
        Sala sala = new Sala();
        sala.setCodigo(dto.codigo());
        sala.setNome(dto.nome());
        return new SalaDTO(salaRepository.save(sala));
    }

    public List<SalaDTO> findAll() {
        return salaRepository.findAll().stream().map(SalaDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<SalaDTO> update(SalaDTO dto) {
        Sala sala = new Sala();
        sala.setId(dto.id());
        sala.setCodigo(dto.codigo());
        sala.setNome(dto.nome());
        return ResponseEntity.ok(new SalaDTO(salaRepository.save(sala)));
    }

    @Transactional
    public void delete(Long id) {
        salaRepository.deleteById(id);
    }

	public ResponseEntity<SalaDTO> findByID(Long id) {
		Sala sala = salaRepository.findById(id).orElse(null);
		if(sala != null) {
			return ResponseEntity.ok(new SalaDTO(sala));
		}
		return new ResponseEntity<SalaDTO>(HttpStatus.NOT_FOUND);
	}
	
	public List<SalaComAulasDTO> getSalasComAulasPorDia(DiaDaSemana diaSemana) {
	    List<Sala> salas = salaRepository.findAll();

	    return salas.stream().map(sala -> {
	        List<AulaDTO> aulas = sala.getAulas().stream()
	            .filter(aula -> aula.getDiaSemana().equals(diaSemana)) 
	            .map(AulaDTO::new)
	            .collect(Collectors.toList());
	        return new SalaComAulasDTO(new SalaDTO(sala), aulas);
	    }).toList();
	}
}