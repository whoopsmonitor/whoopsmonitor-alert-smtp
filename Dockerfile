FROM node:14.13.0-alpine3.12
LABEL maintainer="DevRel <devrel@mallgroup.com>"
LABEL org.opencontainers.image.source="https://github.com/whoopsmonitor/whoopsmonitor-alert-smtp"

LABEL com.whoopsmonitor.documentation="https://github.com/whoopsmonitor/whoopsmonitor-alert-smtp"
LABEL com.whoopsmonitor.env.WM_SMTP_HOST=""
LABEL com.whoopsmonitor.env.WM_SMTP_PORT=""
LABEL com.whoopsmonitor.env.WM_SMTP_SECURE=""
LABEL com.whoopsmonitor.env.WM_SMTP_USER=""
LABEL com.whoopsmonitor.env.WM_SMTP_PASSWORD=""
LABEL com.whoopsmonitor.env.WM_SMTP_FROM=""
LABEL com.whoopsmonitor.env.WM_SMTP_TO=""

RUN apk add openssl=1.1.1g-r0 --no-cache

WORKDIR /app
COPY ./src/index.js ./index.js
COPY ./src/package.json ./package.json
COPY ./src/package-lock.json ./package-lock.json

RUN npm install

CMD [ "npm", "start", "--silent" ]
