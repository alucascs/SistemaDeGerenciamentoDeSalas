package ifba.edu.br.alocacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ifba.edu.br.alocacao.entities.Aula;

public interface AulaRepository extends JpaRepository<Aula, Long>{
	List<Aula> findByDisciplinaIdIn(List<Long> ids);
}
