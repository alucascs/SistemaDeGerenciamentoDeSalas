package ifba.edu.br.alocacao.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*") 
public class HomeController {


    @GetMapping()
    public String home() {
        return "Bem vindo a API de  sistema de alocação de salas!".toUpperCase();
    }
}
