<h1 align="center"> Sistema de Gerenciamento de Ativos (API) </h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucaslui/blog-backend">
  <a href="http://standardjs.com">
    <img alt="Code Style" src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg">
  </a>
  <a href="https://github.com/tgmarinho/nlw1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucaslui/blog-backend">
  </a>
  <a href="https://github.com/lukemorales/rocketshoes-react-native/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lucaslui/blog-backend.svg">
  </a>
</p>

<p align="center">
 <a href="#overview">Visão Geral</a> •
 <a href="#demo">Demonstração</a> • 
 <a href="#technologies">Technologias</a> • 
 <a href="#prerequisites">Pre-requisitos</a> • 
 <a href="#install">Instalação</a> • 
 <a href="#usage">Como usar</a> • 
 <a href="#contributing">Como contribuir</a> • 
 <a href="#author">Autor</a>
</p>

<h4 align="center"> 🚧  <b> Status do projeto </b>: Em progresso...  🚧 </h4>

<h2 id="overview"> 💻 Visão Geral </h2>

A responsabilidade dessa API é prover gerenciamento de ativos para nossos clientes em um esquema **Multi-tenant**, sendo assim o sistema dividido em:

 - **Sistema Principal**: aquele fornecido para os clientes para que ele possa gerenciar **unidades, ativos e outros usuários**.
 - **Sistema Bastidor**: aquele utilizado por colaboradores da Tractian que irão dar suporte do sistema gerenciando **companhias e outros colaboradores**. 

<!-- <h1 align="center">
    <img alt="general-vision" title="#general-vision" src="./docs/architecture/general-vision.png" />
</h1> -->

## 📑 Lista de Features

- [x] Gerenciamento de companhias (backoffice)
- [x] Gerenciamento de usuários de suporte (backoffice)
- [x] Gerenciamento de usuários da companhia
- [x] Gerenciamento de unidades de uma companhia
- [x] Gerenciamento de ativos de uma unidade

<h2 id="demo"> 🧪 Demonstração </h2>

  - [**API Swagger Documentation (hosted with Heroku)**](https://ams-api.onrender.com/docs/)

<h2 id="technologies"> 🧰 Technologias </h2>

As seguintes ferramentas foram utilizadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/)
- [Mongodb](https://www.mongodb.com/)
- [Swagger](https://swagger.io/)

<h2 id="prerequisites"> 🛠 Pre-requisitos </h2>

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

  - node >= 18.0.0
  - docker >= 23.0.1

<h2 id="install"> 🏗️ Instalação </h2>

Na sua linha de comando:

```bash
# Clone this repository
$ git clone https://github.com/lucaslui/backend-ams

# Go into the repository
$ cd backend-ams

# Instalação dependencies
$ npm install
```

<h2 id="usage"> 🚀 Como usar </h2>

É possível rodar diretamente com:

```sh
# Construindo a aplicação
npm run build

# Executando em modo de desenvolvimento
npm run start:dev
```

Porém recomendo usar com [Docker](https://www.docker.com) através:

```sh
# Levantando o container
npm run up
```

<h2 id="contributing"> 🤝 Como contribuir </h2>

Todos os tipos de contribuições são muito bem-vindos e apreciados!

- 🐛 Encontre e relate problemas em "Issues"
- 📥 Envie "PRs" para ajudar a resolver problemas ou adicionar recursos

<h2 id="author"> 👤 Autor </h2>

Criado por [Lucas Lui](https://www.linkedin.com/in/lucas-lui-motta/) 👋🏽 Sinta-se à vontade para entrar em contato comigo!