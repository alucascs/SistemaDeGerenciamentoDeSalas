package ifba.edu.br.alocacao.dtos;

import ifba.edu.br.alocacao.entities.Sala;

public record SalaDTO(Long id, String codigo, String nome) {
    public SalaDTO(Sala sala) {
        this(sala.getId(), sala.getCodigo(), sala.getNome());
    }
}
