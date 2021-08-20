FROM node:14

ADD . /carbon

WORKDIR /carbon

RUN yarn install && npm run-script build

ENTRYPOINT ["npm", "run-script", "start"]

