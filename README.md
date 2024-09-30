# Survey API

![TypeScript badge](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express badge](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Swagger badge](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black)

## 📋 Descrição

Este projeto teve como objetivo desenvolver uma API de enquetes em Node.js seguindo os padrões REST, como também, aplicar os principais conceitos do **Clean Architecture**, e os princípios **SOLID**. O desenvolvimento desta API se baseou no treinamento ministrado pelo professor [Rodrigo Manguinho](https://www.udemy.com/user/rodrigo-manguinho) em um de seus cursos na Udemy.

### Arquitetura do projeto

Para Seguir os princípios propostos por Uncle Bob em seu artigo sobre [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), a arquitetura do projeto se encontra dividida em quatro camadas, são elas: **Domain**, **Presentation**, **Infrastructure** e **Main**.

-   Domain e Presentation → Camadas independentes de códigos de terceiros;
-   Infrastructure e Main → Camadas dependentes de códigos de terceiros;

Abaixo segue uma descrição mais detalhada sobre cada uma delas, como também, um exemplo demonstrando a arquitetura para o **caso de uso do cadastro de usuários**.

<img width="900px" src="https://github.com/nalbertcerqueira/nalbertcerqueira/assets/105606295/4547edb3-b9e7-4a72-b834-8049434a7634">

#### 🔴 Camada de domínio (Domain Layer)

Neste projeto, a camada de domínio é responsável por englobar as **regras de negócio** da aplicação, abstrações de serviços externos, abstrações de repositórios, a as definições de **entidades**, que são as interfaces/classes que representam os dados da API.

Sendo a camada mais independente da arquitetura, ela está isolada das preocupações das camadas externas, e portanto, independe de implementações de terceiros, tais como frameworks e bibliotecas.

#### 🟢 Camada de apresentação (Presentation Layer)

Aqui a camada de apresentação é responsável por conectar os resultados vindos das camadas mais externas, e trata-los para o formato aceito pelos **casos de uso** da camada de domínio. Nela estão contidas principalmente as abstrações/implementações de **controllers** e **middlewares**, bem como as interfaces utilizadas na comunicação com as camadas mais externas.

#### 🟠 Camada de infraestrutura (Infra Layer)

Sendo uma camada que depende de códigos de terceiros, a camada de infraestrutura fica responsável pelas implementações concretas de serviços externos, repositórios, validadores e adaptadores; se comunicando com a camada de apresentação através de interfaces, como: **HttpRequest** e **HttpResponse**, e também, com a camada de domínio através das interfaces de repositórios e serviços.

#### ⚪ Camada principal (Main Layer)

A camada principal fica responsável pela implementação do servidor, inicialização e configuração das rotas e aplicação de middlewares de terceiros. Além disso, é nela onde ocorre a composição das dependências através das **factories**.

### Estrutura do projeto

```
src - ROOT
├── domain                  --→ Camada das regras negócio da aplicação e definições de repositórios e serviços
│   ├── entities                --→ Interfaces e implementações das entidades
│   ├── repositories            --→ Interfaces de repositórios
│   ├── services                --→ Interfaces de serviços
│   └── usecases                --→ Interfaces e implementações dos casos de uso
├── infra                   --→ Camada de implementação dos repositórios, serviços, e validadores
│   ├── adapters                --→ Implementações de adaptadores para frameworks externos
│   ├── db                      --→ Implementação e configuração do banco de dados
│   │   ├── config                  --→ Configuração do banco
│   │   ├── models                  --→ Definição dos models utilizados no banco
│   │   └── repositories            --→ Implementações dos repositórios
│   ├── helpers                 --→ Métodos auxiliares
│   ├── services                --→ Implementações de serviços externos
│   └── validators              --→ Implementações de serviços de validação
├── main                    --→ Camada de composição das dependências e implementação do servidor
│   ├── docs                    --→ Configuração da UI de documentação da API
│   ├── factories               --→ Criação das factories para compor as dependências
│   │   ├── controllers             --→ Factories de controladores
│   │   ├── decorators              --→ Factories de decoradores
│   │   └── middlewares             --→ Factories de middlewares
│   ├── helpers                 --→ Métodos auxiliares
│   └── server                  --→ Implementação do servidor
│       ├── config                  --→ Configuração do servidor
│       └── routes                  --→ Criação das rotas
└── presentation           --→ Camada de implementação dos controladores, decoradores e middlewares
    ├── controllers             --→ Implementação dos controladores
    ├── decorators              --→ Implementação dos decoradores
    ├── middlewares             --→ Implementação dos middlewares
    ├── errors                  --→ Padronização de erros
    ├── helpers                 --→ Métodos auxiliares
    └── protocols               --→ Interfaces e definições utilizadas na camada de apresentação
```

### Rotas

#### Rotas privadas 🔐

| **Método** | **Rota**                   | **Descrição**                                   |
| ---------- | -------------------------- | ----------------------------------------------- |
| GET        | `/api/surveys`             | Retorna uma lista com todas as enquetes         |
| POST       | `/api/surveys`             | Cria uma nova enquete                           |
| GET        | `/api/surveys/:id/results` | Retorna o resultado de uma enquete              |
| PUT        | `/api/surveys/:id/results` | Responde a uma enquete                          |
| DELETE     | `/api/surveys/:id/results` | Cancela a participação o usuário em uma enquete |

#### Rotas públicas 🛤️

| **Método** | **Rota**      | **Descrição**                                    |
| ---------- | ------------- | ------------------------------------------------ |
| POST       | `/api/login`  | Retorna um token de acesso válido para o usuário |
| POST       | `/api/signup` | Cadastra um usuário                              |
| POST       | `/api-docs`   | Documentação da API                              |

## 🎮 Iniciando o projeto

1. Clone este repositório;
2. Baixe as dependências deste projeto com `npm install`;
3. Crie um arquivo `.env` na raiz do projeto contendo as variáveis de ambiente em `.env.sample` com valores de sua preferência.
4. Inicie a aplicação com `npm run dev`;
5. Navegue até `http://localhost:3000/api-docs` para visualizar a documentação da API.

## 🚀 Tecnologias utilizadas

-   Typescript
-   Express
-   Mysql
-   Jsonwebtoken
-   SwaggerUI
-   Husky
-   Bcrypt
-   Yup

## 📝 Licença

MIT License © [MIT License ](./LICENSE)
