FROM node:9-alpine
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install
RUN npm install --save uuid
RUN npm init -y
ENTRYPOINT ["node", "/opt/app/musician.js"]