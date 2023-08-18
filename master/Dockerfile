FROM node:18-alpine As build
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

EXPOSE ${PORT}
CMD [ "node", "dist/main.js" ]
