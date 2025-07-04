FROM node:22-alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

# Declare build-time ARG
ARG ENV_FILE=.env

# Copy env file passed via ARG
COPY ${ENV_FILE} .env.local

RUN npm run build
# Expose the port Next.js runs on
EXPOSE 3000
CMD ["npm", "start"]