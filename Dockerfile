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

RUN npm run build && \
    rm -rf node_modules

FROM nginx:alpine-slim

RUN apk del nginx-module-* && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -s /sbin/nologin -G nginx -g nginx nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]