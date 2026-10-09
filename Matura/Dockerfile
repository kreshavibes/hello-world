FROM node:24-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY public ./public

RUN mkdir -p /data && chown node:node /data
ENV NODE_ENV=production \
    PORT=3000 \
    DB_PATH=/data/matura.db
VOLUME /data
EXPOSE 3000

USER node
CMD ["node", "server/index.js"]
