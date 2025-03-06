package ifba.edu.br.alocacao.dtos;
import ifba.edu.br.alocacao.entities.Email;
import ifba.edu.br.alocacao.entities.EmailType;


public record EmailDTO(String mailFrom, String mailTo, String mailSubject, String mailText, EmailType emailType) {

	public EmailDTO (Email email) {
		this(email.getMailFrom(),email.getMailTo(),email.getMailSubject(),email.getMailText(),email.getType());
	}

}
