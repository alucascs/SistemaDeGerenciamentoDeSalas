package ifba.edu.br.alocacao.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "emails")
public class Email {
    private Long id;
    private String mailFrom;
    private String mailTo;
    private String mailSubject;
    private String mailText;
    private LocalDateTime sendDateEmail;
    
    @Enumerated(EnumType.STRING)
    private EmailStatus status;
    
    @Enumerated(EnumType.STRING)
    private EmailType type;
}
