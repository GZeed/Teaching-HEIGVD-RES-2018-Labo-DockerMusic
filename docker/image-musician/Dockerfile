FROM node:9-alpine
ADD src /opt/app/
RUN ["npm","install"]
ENTRYPOINT ["node", "/opt/app/musician.js"]