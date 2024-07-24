# .......Development Stage.......
FROM node:20-alpine as development

# Defina variáveis de ambiente
ARG POSTGRES_URI
ENV POSTGRES_URI=${POSTGRES_URI}
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

# Define o diretorio do container
WORKDIR /app
# Copiar os arquivos necessarios para iniciar uma aplicacao nodejs
COPY package.json package-lock.json ./
# Instala dependencias
RUN npm install
RUN npm install -g ts-node
# Copia arquivos locais para o container
COPY . .
# Expõe a porta
EXPOSE 3010
# Build da app
RUN npm run build

