# Liftly - Backend

Backend do sistema Liftly desenvolvido com Node.js, Express, Sequelize, PostgreSQL e MongoDB.

---

## 📚 Sumário

- [Liftly - Backend](#liftly---backend)
  - [📚 Sumário](#-sumário)
  - [🧰 Pré-requisitos](#-pré-requisitos)
  - [🚀 Como rodar o projeto](#-como-rodar-o-projeto)
    - [1. Instalar as dependências](#1-instalar-as-dependências)
    - [2. Configurar variáveis de ambiente](#2-configurar-variáveis-de-ambiente)
    - [3. Executar as migrations (criação das tabelas no banco)](#3-executar-as-migrations-criação-das-tabelas-no-banco)
    - [4. Iniciar o servidor em modo desenvolvimento](#4-iniciar-o-servidor-em-modo-desenvolvimento)
  - [🔐 Autenticação](#-autenticação)
  - [🧪 Exemplo de criação de usuário](#-exemplo-de-criação-de-usuário)

---

## 🧰 Pré-requisitos

Certifique-se de que sua máquina possui os seguintes softwares instalados:

- **Node.js** `>= 18`
- **npm** (incluído com o Node)
- **PostgreSQL** `>= 13`
- **MongoDB** `>= 5.0`
- **npx** (incluído com o npm)

Você pode verificar as versões com:

```bash
node -v
npm -v
psql --version
mongo --version
```

---

## 🚀 Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` com base no arquivo de exemplo:

```bash
cp .env.example .env
```

Edite os valores conforme necessário, como:

- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_HOST`
- `JWT_SECRET`
- `MONGO_URI`

---

### 3. Executar as migrations (criação das tabelas no banco)

```bash
npx sequelize-cli db:migrate --env development
```

---

### 4. Iniciar o servidor em modo desenvolvimento

```bash
npm run dev
```

> Para produção, use o comando:
> 
> ```bash
> npm start
> ```

---

## 🔐 Autenticação

Algumas rotas da API exigem autenticação via JWT.

Utilize o token retornado após o login ou criação de usuário e inclua no cabeçalho das requisições protegidas:

```http
Authorization: Bearer <seu_token_aqui>
```

---

## 🧪 Exemplo de criação de usuário

```json
{
  "name": "Usuário Teste",
  "email": "teste@email.com",
  "password": "123456",
  "telefone": "11999999999",
  "altura": 1.75,
  "peso": 70
}
```

---
