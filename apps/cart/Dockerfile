FROM node:20-alpine

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY apps/cart/package.json ./apps/cart/
COPY shared/package.json ./shared/

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build --workspace=apps/cart

EXPOSE 3001

ENV PORT=3001

CMD ["npm", "run", "start", "--workspace=apps/cart"]
