FROM node:latest

USER node

RUN mkdir ~/.npm-global \
  && npm config set prefix '~/.npm-global' \
  && echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc

RUN exec /bin/bash -l

COPY ./src /home/node/src

WORKDIR /home/node/src/jyanken
RUN npm install
EXPOSE 1080

WORKDIR /home/node/src/money_book
RUN npm install
EXPOSE 1081

CMD npm start
