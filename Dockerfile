FROM node:latest

USER node

RUN mkdir ~/.npm-global \
  && npm config set prefix '~/.npm-global' \
  && echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc

RUN exec /bin/bash -l

COPY ./src /home/node/src
WORKDIR /home/node/src/money_book

RUN npm install

ENV PORT 1080
EXPOSE 1080

CMD npm start
