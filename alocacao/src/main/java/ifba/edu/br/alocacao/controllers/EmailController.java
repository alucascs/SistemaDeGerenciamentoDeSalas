package ifba.edu.br.alocacao.controllers;

import ifba.edu.br.alocacao.dtos.EmailDTO;
import ifba.edu.br.alocacao.services.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/email")
public class EmailController {
	@Autowired
    private EmailService emailService;
    
    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO emailDTO) {
        return new ResponseEntity<>("E-mail enviado para a fila com sucesso", HttpStatus.CREATED);
    }
}
