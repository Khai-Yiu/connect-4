FROM nginx:stable-alpine3.19-slim

WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html
COPY dist/assets/ /usr/share/nginx/html/assets