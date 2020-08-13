FROM node:lts-alpine

RUN mkdir -p /opt/www
COPY package*.json /opt/www/
WORKDIR /opt/www
RUN npm ci --prod
COPY . /opt/www

ENTRYPOINT [ "npm", "run", "pm2" ]