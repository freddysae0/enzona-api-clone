FROM docker.uclv.cu/node:16

WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "app.js"]