FROM node:18-alpine
WORKDIR /app
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
ADD https://alphacephei.com/vosk/models/vosk-model-ru-0.42.zip ./models
COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm ci
CMD npm run start:ci
EXPOSE 3000