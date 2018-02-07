FROM mhart/alpine-node:9.5.0

# Installs latest Chromium (63) package.
RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache --update \
      chromium@edge \
      nss@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

# get Carbon
RUN apk add --update --no-cache git && \
    git clone --single-branch --depth=1 https://github.com/dawnlabs/carbon /app && \
    apk del git

# Install dependencies and build it
RUN yarn install && \
    yarn build

ENV NODE_ENV production
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
