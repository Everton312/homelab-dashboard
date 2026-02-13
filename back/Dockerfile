FROM node:18-slim


WORKDIR /usr/src/app

# Dependency files
COPY package*.json ./
RUN npm install --production


COPY . .


EXPOSE 3001

# command to start server
CMD ["node", "src/server.js"]