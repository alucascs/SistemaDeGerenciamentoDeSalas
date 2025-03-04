package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.AulaDTO;
import ifba.edu.br.alocacao.dtos.SalaComAulasDTO;
import ifba.edu.br.alocacao.dtos.SalaDTO;
import ifba.edu.br.alocacao.entities.DiaDaSemana;
import ifba.edu.br.alocacao.entities.Sala;
import ifba.edu.br.alocacao.exceptions.NotFoundException;
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

	public SalaDTO findByID(Long id) {
		return salaRepository.findById(id).map(SalaDTO::new)
				.orElseThrow(() -> new NotFoundException("Sala não encontrada com ID: " + id));
	}

	@Transactional
	public SalaDTO update(SalaDTO dto) {
		if (!salaRepository.existsById(dto.id())) {
			throw new NotFoundException("Sala não encontrada com ID: " + dto.id());
		}
		Sala sala = new Sala();
		sala.setId(dto.id());
		sala.setCodigo(dto.codigo());
		sala.setNome(dto.nome());
		return new SalaDTO(salaRepository.save(sala));
	}

	@Transactional
	public void delete(Long id) {
		if (!salaRepository.existsById(id)) {
			throw new NotFoundException("Sala não encontrada com ID: " + id);
		}
		salaRepository.deleteById(id);
	}

	public List<SalaComAulasDTO> getSalasComAulasPorDia(DiaDaSemana diaSemana) {
		List<Sala> salas = salaRepository.findAll();

		return salas.stream().map(sala -> {
			List<AulaDTO> aulas = sala.getAulas().stream().filter(aula -> aula.getDiaSemana().equals(diaSemana))
					.map(AulaDTO::new).collect(Collectors.toList());
			return new SalaComAulasDTO(new SalaDTO(sala), aulas);
		}).toList();
	}
}
