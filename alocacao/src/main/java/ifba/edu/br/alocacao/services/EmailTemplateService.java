package ifba.edu.br.alocacao.services;
import ifba.edu.br.alocacao.dtos.EmailDTO;

public class EmailTemplateService {
	 public String generateEmailText(EmailDTO dto) {
	        switch (dto.emailType()) {
	            case USUARIO_VINCULADO:
	                return String.format(
	                        "Olá, %s!\n\nVocê foi cadastrado na disciplina %s com sucesso.\n\nAtenciosamente,\nSecretaria Acadêmica",
	                        dto.mailTo(),
	                        dto.mailSubject()
	                );

	            case USUARIO_DESVINCULADO:
	                return String.format(
	                        "Olá, %s!\n\nVocê foi removido da disciplina %s. Caso tenha dúvidas, entre em contato com a secretaria.\n\nAtenciosamente,\nSecretaria Acadêmica",
	                        dto.mailTo(),
	                        dto.mailSubject()
	                );

	            default:
	                return "Notificação acadêmica.";
	        }
	    }
}
