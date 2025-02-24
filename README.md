<h1 align="center">Sistema de Alocação de Salas do IFBA</h1>

<p align="center">Projeto avaliativo da disciplina de Programação Web, utilizando Java com Spring Boot para o back-end e React para o front-end.</p>

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![Swagger](https://img.shields.io/badge/swagger-%2385EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black)

Este projeto utiliza [Java](https://www.java.com/pt-BR/) e [React](https://react.dev/).

---

## 📌 Tecnologias Utilizadas

- **Back-end:** [Spring Boot](https://spring.io/) ([Java](https://www.java.com/pt-BR/)) com JPA/Hibernate para persistência  
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)  
- **Front-end:** [React.js](https://react.dev/) com Axios para integração com a API  
- **Autenticação:** Spring Security com JWT para controle de acesso dos usuários  
- **Documentação da API:** [Swagger](https://swagger.io/) para geração e visualização da documentação da API  
- **Estilização:** CSS e Bootstrap  
- **Gerenciamento de Dependências:** [Maven](https://maven.apache.org/) para o back-end e [npm](https://www.npmjs.com/) para o front-end  

---

## 🚀 Instalação e Configuração

### 🔧 Pré-requisitos  
Certifique-se de ter instalado:  
- **Java 17+**  
- **Maven**  
- **Node.js**  
- **PostgreSQL**  
- **Lombok** (caso use um IDE como Eclipse ou IntelliJ, habilite o suporte a Lombok) 

### 🔥 Configuração do Banco de Dados  
#### 🛠️ Execute o script de criação do banco:
```  
CREATE DATABASE postgres
```
#### 🔧 No arquivo application.properties, configure as credenciais do banco:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres  
spring.datasource.username= **seu_usuario**  
spring.datasource.password= **sua_senha** 
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true
```

### 🏗️ Como Rodar o Projeto
#### 🎯 Backend
Clone o repositório e acesse a pasta do projeto:  
Em um terminal digite:  
```
git clone https://github.com/alucascs/SistemaDeGerenciamentoDeSalas.git
```
- Inicialize os microsserviços
- A API principal de alocação estará rodando em http://localhost:8080
##### Caso deseje visualizar a documentação gerada pelo swagger será necessario desativar a autenticação:
- Para isso, basta acessar a classe SecurityConﬁgurations dentro do package security e alternar os metodos securityFilterChain, comentando o descomentado e descomentado o comentado
#### 🎨 Frontend  
- Abra a pasta clonada no terminal  
- Navegue até a pasta do front-end  
- Instale as dependências  
- Execute o projeto  
```
cd front
npm install
npm run dev
```
