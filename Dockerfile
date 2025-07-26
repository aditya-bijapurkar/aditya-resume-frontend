FROM node:20-alpine AS build

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

ENV NODE_OPTIONS="--max-old-space-size=512"
ENV GENERATE_SOURCEMAP=false
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true

WORKDIR /app

COPY package*.json ./

RUN npm install --production --no-optional --no-audit --no-fund

COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./

RUN npm run build

FROM nginx:alpine-slim

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]