package ifba.edu.br.alocacao.dtos;

import java.util.List;

public record SalaComAulasDTO(Long id, String codigo, String nome, List<AulaDTO> aulas) {
    public SalaComAulasDTO(SalaDTO sala, List<AulaDTO> aulas) {
        this(sala.id(), sala.codigo(), sala.nome(), aulas);
    }
}
