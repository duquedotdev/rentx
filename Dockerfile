FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . . 

EXPOSE 3333

CMD ["npm", "run", "dev"]

# docker build -t rentx .

# docker exec -it nome_do_container /bin/bash

# docker compose

# docker ps -a - mostra todos os containers

# docker-compose down - remove tudo o que foi criado

# docker logs -f