# <center>Projeto Backend em Node.js</center>

Este é um projeto backend em Node.js para um aplicativo de TODOS, utilizando as seguintes dependências:

<br>

## Dependências Principais

1. **Express.js**: Um framework web para Node.js que facilita a criação de APIs.

2. **Cors**: Um middleware para Express.js que habilita o controle de acesso HTTP.

<br>

## Dependências de Desenvolvimento

1. **Prisma**: Uma ferramenta de banco de dados ORM (Object-Relational Mapping) para Node.js e TypeScript.

2. **TypeScript**: Uma linguagem de programação que adiciona tipagem estática ao JavaScript.

3. **ts-node**: Permite a execução direta de arquivos TypeScript sem a necessidade de compilação.

4. **Prettier**: Uma ferramenta de formatação de código para manter um estilo consistente.

<br>

## Descrição do Aplicativo de To-Dos

O aplicativo de to-dos é uma aplicação simples e intuitiva para ajudá-lo a organizar suas tarefas diárias.

### Principais Recursos:

- **Adição de Tarefas:** Adicione facilmente novas tarefas à sua lista.
- **Edição e Exclusão:** Faça alterações nas tarefas existentes ou remova aquelas que não são mais necessárias.
- **Marcação de Conclusão:** Marque as tarefas concluídas para acompanhar seu progresso.
- **Organização Intuitiva:** Organize suas tarefas de maneira eficiente para melhorar a produtividade.

Este backend oferece suporte à lógica de negócios do aplicativo de to-dos, gerenciando as operações no banco de dados e fornecendo uma API para interação com o frontend.

<br>

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
server/
|-- prisma/
| |-- migrations/
| |-- seed/
| |-- dev.db
| |-- schema.prisma
|-- src/
| |-- app/
| |-- controllers/
| |-- models/
| |-- routes/
| |-- app.ts
| |-- middlewares.ts
| |-- routes.ts
| |-- server.ts
|-- .env
|-- package.json
|-- readme.md
|-- tsconfig.json
```

<br>

## Configuração do TypeScript

O arquivo `tsconfig.json` é configurado da seguinte maneira:

```json
{
  "extends": "ts-node/node16/tsconfig.json",
  "ts-node": {
    "transpileOnly": true,
    "files": true
  },
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist/",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules"]
}
```

<br>

## Scripts no package.json

```json
{
  "scripts": {
    "start": "node --env-file=.env src/app.ts",
    "dev": "node --env-file=.env --watch ./src/app.ts",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:generate": "npx prisma generate"
  },
  "prettier": {
    "arrowParens": "always",
    "bracketSpacing": true,
    "endOfLine": "lf",
    "printWidth": 100,
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
  },
  "prisma": {
    "seed": "ts-node prisma/seed"
  }
}
```

<br>

## .ENV.EXEMPLE

```js
# Configurações para execução de TypeScript com Node.js
NODE_OPTIONS="-r ts-node/register --no-warnings --trace-warnings"

# Configurações para o aplicativo
APP_PORT=3000
```
