# Source: https://github.com/zeit/now-static-build-starter/blob/master/Dockerfile
FROM mhart/alpine-node:10
# We store all our files in /usr/src to perform the build
WORKDIR /usr/src
# We first add only the files required for installing deps
# If package.json or yarn.lock don't change, no need to re-install later
COPY package.json yarn.lock ./
# We install our deps
RUN yarn
# We copy all source files
COPY . .
# We run the build and expose as /public
RUN yarn build && yarn export -o /public
