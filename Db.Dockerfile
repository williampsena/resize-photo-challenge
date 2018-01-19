FROM mongo:3.0
ARG source
COPY ./config/mongod.conf /etc/mongod.conf
EXPOSE 5018
CMD ["mongod", "--config=/etc/mongod.conf"]