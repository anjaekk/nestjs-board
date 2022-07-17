FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM node:18-alpine3.15
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:dev"]