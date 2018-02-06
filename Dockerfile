FROM mhart/alpine-node:9.5.0

WORKDIR /app

COPY . .

RUN yarn && \
    yarn build

ENV NODE_ENV=production

ENTRYPOINT ["yarn", "start"]
