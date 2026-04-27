FROM node:20

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
COPY shared/ ../shared/

EXPOSE 3000

CMD ["node", "src/server.js"]