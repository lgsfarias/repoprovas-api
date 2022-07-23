# <p align = "center"> RepoProvas API </p>

<p align="center">
   <img src="./info/README.png" alt="RepoProvas API" width="300" />
</p>

## :pick: Ferramentas

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>

## :clipboard: Descrição

O RepoProvas é um sistema de compartilhamento de provas entre estudantes. Onde é possicel adicionar provas separadas por disciplinas, professores e períodos.

---

## :computer: Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Postgres and Prisma

---

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsumloremipsum",
        "confirmPassword": "loremipsumloremipsum"
}
```

```yml
POST /signin
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsumloremipsum"
    }
```

```yml
POST /tests
    - Rota para cadastrar uma nova prova
    - headers: {
        "Authorization": "Bearer <token>"
    }
    - body: {
        "name": "Prova de Matemática",
        "pdfUrl": "https://www.linkdopdf.com/arquivo.pdf",
        "categoryId": 1,
        "teacherId": 1,
        "disciplineId": 1
    }
```

```yml
GET /tests/byteachers
    - Rota para listar todas as provas agrupados por professor
    - headers: {
        "Authorization": "Bearer <token>"
    }
```

```yml
GET /tests/byterms
    - Rota para listar todas as provas agrupados por período
    - headers: {
        "Authorization": "Bearer <token>"
    }
```

---

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/lgsfarias/repoprovas-api
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```
