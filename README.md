# App ***GymPass*** Node.js

## projeto 03 Trilha Node.js Ignite 2022/2023 - Rocketseat

### Sobre o Projeto:

* ***GymPass*** é uma aplicação Node.js para check-ins em acadêmias. Nesse projeto tem como objetivo aperfeiçoar conhecimentos em SOLID, Designer Patterns, Docker e Testes tanto *unitários* quanto de *integração*

### Tecnologias utilizadas:

* Express
* Zod
* Typescript
* Jest

### Bibliotecas em destaque:

* Zod
* tsup
* Jest

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados por um usuário;
- [] Deve ser possível o usuário buscar acadêmias próximas a ele;
- [] Deve ser possível buscar acadêmias pelo nome;
- [] Deve ser possível realizar um check-in em uma acadêmia;
- [] Deve ser possível validar um check-in de um usuário;
- [] Deve ser possível cadastrar um acadêmia;

## RNs (Regras de negócio)

- [] O usuário não pode se cadastrar um e-mail duplicado;
- [] O usuário não pode fazer mais de dois check-ins por dia;
- [] O usuário não pode fazer check-in se não tiver pelo menos a 100m da acadêmia;
- [] O check-in só pode ser válido até 20 minutos após ser criado;
- [] O check-in só pode ser válido até 20 minutos após ser criado;
- [] O check-in só pode ser válidado por administrador;
- [] A acadêmia só pode ser criada por um admistrador;


## RNFs (Requisitos não funcionais)

- [] A senha precisa ser criptografada;
- [] Os dados da aplicação precisam estar persistidos(salvos) em BD PostgreSQL;
- [] Os dados da aplicação precisam estar persistidos(salvos) em BD PostgreSQL;
- [] Todas as listas de dados precisar estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT(JSON Web Token);

