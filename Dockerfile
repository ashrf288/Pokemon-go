# Use an appropriate Node.js base image, e.g., node:14
FROM node:20.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY start.sh /start.sh
RUN chmod +x /start.sh

# Run your start script
CMD ["/start.sh"]
