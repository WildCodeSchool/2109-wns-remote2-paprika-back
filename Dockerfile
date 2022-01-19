FROM node:lts-alpine

RUN mkdir /paprika-back
WORKDIR /paprika-back

COPY .env ./
COPY package*.json ./
RUN npm i

COPY prisma prisma
RUN npx prisma generate

COPY src src
COPY tsconfig.json ./



CMD npm start