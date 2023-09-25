FROM node:16
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY swagger.json ./
COPY copyStaticAssets.ts ./
COPY custom_typings ./
COPY app ./app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start" ]