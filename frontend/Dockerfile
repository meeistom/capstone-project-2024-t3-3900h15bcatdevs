FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn install --no-cache-dir -r requirements.txt

CMD ["yarn", "start"]
