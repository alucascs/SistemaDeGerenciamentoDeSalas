package ifba.edu.br.alocacao.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ifba.edu.br.alocacao.dtos.SalaDTO;
import ifba.edu.br.alocacao.entities.Sala;
import ifba.edu.br.alocacao.repository.SalaRepository;

@Service
public class SalaService {
    private final SalaRepository salaRepository;

    public SalaService(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    public SalaDTO save(SalaDTO dto) {
        Sala sala = new Sala();
        sala.setCodigo(dto.codigo());
        sala.setNome(dto.nome());
        return new SalaDTO(salaRepository.save(sala));
    }

    public List<SalaDTO> findAll() {
        return salaRepository.findAll().stream().map(SalaDTO::new).collect(Collectors.toList());
    }

    public SalaDTO update(SalaDTO dto) {
        Sala sala = new Sala();
        sala.setId(dto.id());
        sala.setCodigo(dto.codigo());
        sala.setNome(dto.nome());
        return new SalaDTO(salaRepository.save(sala));
    }

    public void delete(Long id) {
        salaRepository.deleteById(id);
    }
}