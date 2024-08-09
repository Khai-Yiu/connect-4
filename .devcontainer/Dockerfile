FROM nginx:1.20-alpine

RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN mkdir /etc/letsencrypt

COPY startup.sh .
RUN chmod +x startup.sh
ENTRYPOINT ["startup.sh"]

WORKDIR /usr/share/nginx/html
COPY dist .
COPY default.conf /etc/nginx/conf.d/default.conf