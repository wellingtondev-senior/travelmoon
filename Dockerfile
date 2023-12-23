# Use a imagem oficial do Node.js como base
FROM node:16 

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo `package.json` e `package-lock.json` para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do aplicativo para o diretório de trabalho
COPY . .

# Construa o aplicativo Next.js para produção
RUN yarn run build

# Exponha a porta em que o servidor Next.js irá escutar (a porta padrão é 3000)
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["yarn", "start"]
