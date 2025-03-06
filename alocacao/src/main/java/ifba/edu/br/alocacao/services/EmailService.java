package ifba.edu.br.alocacao.services;

import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import ifba.edu.br.alocacao.entities.Email;
import ifba.edu.br.alocacao.entities.EmailStatus;
import ifba.edu.br.alocacao.entities.EmailType;
import ifba.edu.br.alocacao.entities.Usuario;
import ifba.edu.br.alocacao.exceptions.NotFoundException;
import ifba.edu.br.alocacao.entities.Disciplina;
import ifba.edu.br.alocacao.dtos.EmailDTO;
import ifba.edu.br.alocacao.repository.EmailRepository;
import ifba.edu.br.alocacao.repository.DisciplinaRepository;
import ifba.edu.br.alocacao.repository.UsuarioRepository;

import java.time.LocalDateTime;


@Service
public class EmailService {
	
	 	@Autowired
	    private EmailRepository emailRepository;
	 	
	 	@Autowired
	 	private UsuarioRepository usuarioRepository;
	 	
	 	@Autowired
	 	private DisciplinaRepository disciplinaRepository;
	 	
	 	@Autowired
	 	private EmailTemplateService emailTemplateService;
	    
	    @Autowired
	    private JavaMailSender emailSender;
	    
	    @Autowired
	    private RabbitTemplate rabbitTemplate;

	    @RabbitListener(queues = "email.notificacao")
	    public void processEmailQueue(EmailDTO dto) {
	        Email email = new Email();
	        email.setMailFrom(dto.mailFrom());
	        email.setMailTo(dto.mailTo());
	        email.setMailSubject("Notificação Acadêmica" + dto.mailSubject());
	        email.setMailText(emailTemplateService.generateEmailText(dto));
	        email.setSendDateEmail(LocalDateTime.now());
	        
	        try {
	            SimpleMailMessage message = new SimpleMailMessage();
	            message.setFrom(dto.mailFrom());
	            message.setTo(dto.mailTo());
	            message.setSubject(dto.mailSubject());
	            message.setText(dto.mailText());
	            emailSender.send(message);
	            email.setStatus(EmailStatus.SENT);
	        } catch (Exception e) {
	            email.setStatus(EmailStatus.ERROR);
	        }
	        
	        emailRepository.save(email);
	    }
	    
	    public void notificarUsuario(Long usuarioId,Long disciplinaId, EmailType emailType) {
	        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() ->new NotFoundException("Usuário não encontrado com ID: " + usuarioId));
	        Disciplina disciplina = disciplinaRepository.findById(disciplinaId).orElseThrow(() ->new NotFoundException("Disciplina não encontrada com ID: " + disciplinaId));
	    	EmailDTO emailDTO = new EmailDTO("secretaria@universidade.com",
	    			usuario.getEmail(),
	    			disciplina.getNome(),
	    			"",
	    			emailType
	    			);
	        rabbitTemplate.convertAndSend("email.notificacao", emailDTO);
	    }

}
