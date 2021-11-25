# Paprika

Paprkia is a tool for project management.

## Installation

Clone the project and run :

```bash
npm i
```

## Database

run to apply migrations 

```zsh
npm run db:migration
```

create a migration

```zsh
npx prisma migrate dev --name [name of your migration]
```

seed the database

```zsh
npm run db:seed
```

## Workflow

### Schemas

- create shema of your table in a file in graphql/schemas/[name]Schemas.ts
- import yout file in graphql/schema/typeDefs.ts and add it to the array

### Resolvers

- create resolver of your table in a file in graphql/resolvers/[name]Resolver.ts
- import yout file in graphql/resolvers/resolvers.ts and add it to the array
