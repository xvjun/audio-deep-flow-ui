FROM nginx:latest
MAINTAINER xujun 15604288825@163.com
ENV TZ=Asia/Shanghai
COPY build /usr/share/nginx/html
COPY public/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./start.sh /
EXPOSE 8090
ENTRYPOINT ["bash", "/start.sh"]
