package ifba.edu.br.alocacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ifba.edu.br.alocacao.entities.Sala;

public interface SalaRepository extends JpaRepository<Sala, Long> {

}
