FROM node
ARG source
WORKDIR /app
COPY ${source:-dist} /app
COPY ${source:-package.json} /app
COPY ${source:-src/settings-prod.json} /app/settings.json
COPY ${source:-src/start.sh} /app
RUN npm install
RUN chmod +x /app/start.sh
EXPOSE 3000:3000
ENTRYPOINT ["/app/start.sh"]