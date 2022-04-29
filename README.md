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
- import your file in graphql/schema/typeDefs.ts and add it to the array

### Resolvers

- create resolver of your table in a file in graphql/resolvers/[name]Resolvers.ts
- import your file in graphql/resolvers/resolvers.ts and add it to the array

## CI / CD

### Caddy
Domain name stored in CloudFlare.
Caddy is a VPS (Virtual Private Server), it changes the IP address to a domain name, example: 
##### Preprod => https://staging.remote1-0921.wns.wilders.dev/login
##### Prod    => https://remote1-0921.wns.wilders.dev/login

<br/> **To edit** -> caddyfile ```sudo nano /etc/caddy/Caddyfile```
<br/> After edit need to **reload service** with : ```systemctl reload caddy```

### Docker compose
This project has 4 images:
+ ##### Prod:
  - wonecode/paprika-front
  - melissakintz/paprika-back

+ ##### Preprod:
  - wonecode/paprika-front-staging:latest
  - melissakintz/paprika-back-staging:latest

Check all the current images: ```docker image ls```
<br/> Check connection: ```docker network ls```
<br/> **Start app:** ```GATEWAY_PORT=8000 docker-compose up --build``` (Preprod: 8001 and prod :8000)
<br/> Verify answer: ```curl https://staging.remote1-0921.wns.wilders.dev/login``` (here should return html)

### NginX
**docker-compose.yml** :  nginx service is used to redirect
<br/> On file ./nginx.conf:/etc/nginx/nginx.conf, we listen to port :80, 
<br/> if url contains **/graphql** => redirect to port 4000 (backend)
<br/> else redirect to port 3000 (frontend).

### Script fetch and deploy 
File bash to update app, use command =>  ./fetch-and-deploy.sh

### Webhooks
Summary of the hooks: When stagings Preprod change => update images and update front/back Prod
<br/> For this app we have 4 webhooks: front/front-staging/back/back-staging
<br/> File available with command "cat /etc/webhook.conf"
<br/> To start: ```systemctl start webhook```
<br/> To reload: ```systemctl daemon-reload```
<br/> To check logs: ```journalctl -u webhook.service -f```
