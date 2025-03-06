package ifba.edu.br.alocacao.configuration;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// @Configuration
// @EnableRabbit
public class EmailConfiguration {
	 @Bean
	    public Queue emailQueue() {
	        return new Queue("email.notificacao", false);
	    }
	    
	    @Bean
	    public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory) {
	        return new RabbitAdmin(connectionFactory);
	    }
	    
	    @Bean
	    public Jackson2JsonMessageConverter messageConverter() {
	        return new Jackson2JsonMessageConverter();
	    }
	    
	    @Bean
	    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, Jackson2JsonMessageConverter converter) {
	        RabbitTemplate template = new RabbitTemplate(connectionFactory);
	        template.setMessageConverter(converter);
	        return template;
	    }
}

