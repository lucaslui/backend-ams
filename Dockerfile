FROM node:18-alpine

COPY ./ /home/app/backend

WORKDIR /home/app/backend

RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm -rf ./src ./tsconfig.json ./tsconfig-build.json

CMD ["npm", "start"]
