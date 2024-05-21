FROM node:lts-alpine AS base
WORKDIR /app

RUN npm install -g pnpm@9.1.0

COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM node:lts-alpine AS runtime
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY run-server.mjs ./

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", "./run-server.mjs"]
