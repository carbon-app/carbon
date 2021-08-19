FROM node:14

ADD . /carbon

WORKDIR /carbon

RUN cd /carbon && yarn install && npm run-script build

ENTRYPOINT ["npm", "run-script", "start"]

