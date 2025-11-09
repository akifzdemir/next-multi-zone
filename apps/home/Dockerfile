FROM node:20-alpine

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY apps/home/package.json ./apps/home/
COPY shared/package.json ./shared/

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build --workspace=apps/home

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "run", "start", "--workspace=apps/home"]
