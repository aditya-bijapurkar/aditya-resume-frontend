FROM node:18-alpine AS build

ARG REACT_APP_API_BASE_URL
ARG REACT_APP_AUTH_BASE_URL
ARG GOOGLE_RECAPTCHA_V3_SITE_KEY

ENV NODE_OPTIONS="--max-old-space-size=512"
ENV GENERATE_SOURCEMAP=false
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_ENV=production
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_AUTH_BASE_URL=$REACT_APP_AUTH_BASE_URL
ENV REACT_APP_RECAPTCHA_SITE_KEY=$GOOGLE_RECAPTCHA_V3_SITE_KEY

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund --prefer-offline

COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.json ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY fe-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]