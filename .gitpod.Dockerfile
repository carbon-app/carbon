FROM gitpod/workspace-full-vnc:latest

# Pin Node.js to v12.

RUN bash -c ". .nvm/nvm.sh \
    && nvm install 12 \
    && nvm use 12 \
    && nvm alias default 12 \
    && npm install -g yarn"