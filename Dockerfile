FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV HOST 0.0.0.0

EXPOSE 3000

COPY docker.sh /docker.sh

RUN chmod 744 /docker.sh

CMD [ "/docker.sh" ]