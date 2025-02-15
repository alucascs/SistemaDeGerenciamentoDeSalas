package ifba.edu.br.alocacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ifba.edu.br.alocacao.entities.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {

}
