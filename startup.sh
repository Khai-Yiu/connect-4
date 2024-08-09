#! /bin/bash

docker build -t nginx-certbot .
docker run -v $(pwd)/letsencrypt:/etc/letsencrypt --name nginx -ti -p 8080:80 nginx-certbot sh
certbot --nginx -d https://connect4.khai.graduate-program.journeyone.com.au/