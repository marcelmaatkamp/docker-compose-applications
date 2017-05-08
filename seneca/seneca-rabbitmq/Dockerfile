FROM node
WORKDIR /project
COPY conf/package.json package.json
COPY src/start.js start.js
RUN npm install
CMD ["node","start.js"]
