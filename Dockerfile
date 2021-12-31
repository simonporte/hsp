FROM alpine:3.14
RUN apk add --no-cache curl
WORKDIR /home
ADD "https://github.com/simonporte/hsp/archive/refs/heads/master.zip" .
RUN unzip master.zip

FROM alpine:3.14
RUN apk add --no-cache darkhttpd
COPY --from=0 /home/hsp-master/src /www/src
COPY --from=0 /home/hsp-master/index.html /www/
COPY --from=0 /home/hsp-master/entrypoint.sh /

EXPOSE 80

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]