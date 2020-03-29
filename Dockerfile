FROM node:latest

USER node

RUN mkdir ~/.npm-global \
  && npm config set prefix '~/.npm-global' \
  && echo "export PATH=~/.npm-global/bin:$PATH" >> ~/.bashrc

RUN exec /bin/bash -l

COPY ./src /home/node/src
WORKDIR /home/node/src/hello_react

RUN npm install react react-dom \
  && npm install webpack webpack-dev-server --save-dev \
  && npm install babel-cli babel-loader babel-preset-env babel-preset-react --save-dev \
  && npm install eslint eslint-loader eslint-plugin-react --save-dev \
  && npm install css-loader style-loader babel-loader --save-dev

ENV PORT 3000
EXPOSE 3000

CMD /bin/bash
