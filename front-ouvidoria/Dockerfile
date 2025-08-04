# Dockerfile para Next.js (front-ouvidoria)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN --mount=type=secret,id=dotenv,required=true \
    export $(grep -v '^#' /run/secrets/dotenv | xargs) && \
    npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm install --production --frozen-lockfile
EXPOSE 3000
CMD ["npm", "start"]
