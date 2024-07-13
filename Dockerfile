FROM node

WORKDIR /src/app

COPY package.json ./

RUN npm install

COPY . .

ARG MONG_URI
ARG JWT_SECRET

ENV MONG_URI=$MONG_URI
ENV JWT_SECRET=$JWT_SECRET

RUN echo "MONG_URI=${MONG_URI}" > .env
RUN echo "PORT=3010" > .env
RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

RUN npm i -g pnpm

EXPOSE 3010

CMD ["node", "build/server"]