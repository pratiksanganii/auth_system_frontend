FROM node:22-alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build
# Expose the port Next.js runs on
EXPOSE 3000
CMD ["npm", "start"]