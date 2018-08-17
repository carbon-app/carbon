FROM node:9-alpine

# Source https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
# Installs latest Chromium package.
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN apk update && apk upgrade && \
    echo http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium \
      nss

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN yarn

COPY . .

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

ENV NODE_ENV production
EXPOSE 4000
CMD [ "node", "server.js" ]
