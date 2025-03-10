package ifba.edu.br.alocacao.entities;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Aula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(optional = false)
    private Disciplina disciplina;
    
    @ManyToOne(optional = false)
    private Sala sala;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DiaDaSemana diaSemana;
    
    @Column(nullable = false)
    private LocalTime horarioInicio;
    
    @Column(nullable = false)
    private Integer duracao;
}
