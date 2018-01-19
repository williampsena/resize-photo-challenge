FROM mongo:3.0
ARG source
COPY ./config/mongod.conf /etc/mongod.conf
COPY ${source:-photos.json} /tmp
CMD mongoimport --verbose --host mongodb --port 5018 --jsonArray --db resize-photos-challenge --collection photos --file /tmp/photos.json