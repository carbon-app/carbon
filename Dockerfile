FROM mhart/alpine-node:9.5.0
WORKDIR /app

# get Carbon
RUN apk add --update --no-cache git && \
    git clone --single-branch --depth=1 https://github.com/dawnlabs/carbon /app && \
    apk del git

# Install dependencies and build it
RUN yarn install && \
    yarn build

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
