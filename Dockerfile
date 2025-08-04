FROM node:16-alpine AS build

ENV NODE_OPTIONS="--max-old-space-size=512"
ENV GENERATE_SOURCEMAP=false
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --no-audit --no-fund --prefer-offline && \
    npm cache clean --force

COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./

ARG GOOGLE_RECAPCHA_V3_SITE_KEY
ENV REACT_APP_RECAPTCHA_SITE_KEY=${GOOGLE_RECAPCHA_V3_SITE_KEY}

RUN npm run build && \
    rm -rf node_modules

FROM nginx:alpine-slim

RUN apk del nginx-module-* && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]