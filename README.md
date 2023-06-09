# App ***GymPass*** Node.js

## projeto 03 Trilha Node.js Ignite 2022/2023 - Rocketseat

### Sobre o Projeto:

* ***GymPass*** é uma aplicação Node.js para check-ins em acadêmias. Nesse projeto tem como objetivo aperfeiçoar conhecimentos em SOLID, Designer Patterns, Docker e Testes tanto *unitários* quanto de *integração*, tudo isso utilizando TDD no desenvolvimento.

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

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados por um usuário;
- [x] Deve ser possível o usuário buscar acadêmias próximas a ele;
- [x] O usuário pode visualizar o histórico de check-ins;
- [x] Deve ser possível buscar acadêmias pelo nome(Title);
- [x] Deve ser possível realizar um check-in em uma acadêmia;
- [x] Deve ser possível validar um check-in de um usuário;
- [x] Deve ser possível cadastrar um acadêmia;

## RNs (Regras de negócio)

- [x] O usuário não pode se cadastrar um e-mail duplicado;
- [x] O usuário não pode fazer mais de dois check-ins por dia;
- [x] O usuário não pode fazer check-in se não tiver pelo menos a 100m da acadêmia;
- [x] O check-in só pode ser válido até 20 minutos após ser criado;
- [x] O check-in só pode ser válidado por administrador;
- [x] A acadêmia só pode ser criada por um admistrador;
- [x] A acadêmia não pode ser cadastrada com title(nome) duplicado;


## RNFs (Requisitos não funcionais)

- [x] A senha precisa ser criptografada;
- [x] Os dados da aplicação precisam estar persistidos(salvos) em BD PostgreSQL;
- [x] Todas as listas de dados precisar estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT(JSON Web Token);

