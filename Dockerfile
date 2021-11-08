FROM alpine:3.14

RUN apk add --no-cache darkhttpd

#COPY src /www/src
#COPY index.html /www/
#COPY entrypoint.sh /

EXPOSE 80
ENTRYPOINT ["/bin/sh", "/www/entrypoint.sh"]
