FROM node:9-alpine
EXPOSE 2205
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm init -y
RUN npm install --save uuid
RUN npm install --save moment
ENTRYPOINT ["node", "/opt/app/auditor.js"]