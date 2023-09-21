FROM node:16

WORKDIR /app

# Frontend setup and build
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
COPY frontend/ .
RUN npm run build

# Backend setup
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

EXPOSE 3000

CMD ["node", "server.mjs"]
