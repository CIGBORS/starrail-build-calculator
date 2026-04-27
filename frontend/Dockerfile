FROM node:20

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
COPY shared/ ../shared/

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]