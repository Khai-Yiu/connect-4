FROM nginx:1.20-alpine

RUN apk add python3 py3-pip build-base libressl-dev
RUN pip3 install --upgrade pip
RUN pip3 install certbot-nginx 
RUN mkdir /etc/letsencrypt

WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist/ .