FROM node:lts-alpine

RUN mkdir /paprika-back
WORKDIR /paprika-back

COPY package*.json ./
RUN npm i

COPY prisma prisma
RUN npx prisma generate

COPY src src
COPY tsconfig.json ./

ENV DATABASE_URL=mysql://root:password@mysqldb:3306/paprika
CMD ["npm", "start"]