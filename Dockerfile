FROM node:12-alpine

RUN set -x \
    && apk update \
    && apk upgrade \
    #&& echo "127.0.0.1 localhost" >> /etc/hosts \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    # add the packages
    ## g++: used to install NodeJS related packages
    && apk add --no-cache g++ tesseract-ocr

# issue https://stackoverflow.com/questions/57714810/docker-nodealpine-12-how-to-install-chromium-73-in-dockerfile

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8081

EXPOSE 8081

CMD [ "npm", "start" ]