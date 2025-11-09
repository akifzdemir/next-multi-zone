# Next.js Multi-Zones Project

This project consists of two separate applications using Next.js Multi-Zones:

- **Home** (port 3000): Main application - Products
- **Cart** (port 3001): Shopping cart application

## Project Structure

```
/
├── apps/
│   ├── home/          # Main application
│   └── cart/          # Cart application
├── shared/            # Shared components and code
└── package.json       # Root package.json
```

## Development

### Run both applications together:

```bash
npm run dev
```

### Run applications separately:

```bash
npm run dev:home   # Home app (port 3000)
npm run dev:cart   # Cart app (port 3001)
```

## Running with Docker

```bash
# Build and Run
docker compose up --build

# Run in background
docker compose up -d

# Stop
docker compose down

# Show logs
docker compose logs -f
```

> **Note:** Use `docker-compose` (with hyphen) for older Docker versions.

## URLs

### Development:

- Home: http://localhost:3000
- Cart: http://localhost:3000/cart (via Next.js rewrites)

### Docker:

- Home: http://localhost:3000
- Cart: http://localhost:3000/cart (via Next.js rewrites)

## Multi-Zone Configuration

- **Home** app runs as the main application and routes `/cart` path to the cart application
- **Cart** app runs with `/cart` basePath and uses assetPrefix
- Navigation between zones is hard navigation, within the same zone is soft navigation
- **No Nginx needed** - routing is done via Next.js rewrites

## Shared Components

See `SHARED_USAGE.md` for details.

## State Management

- **Zustand** for global state management
- **localStorage** for persistence
- Same cart data in both apps

## Technologies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Motion (Framer Motion)
- Docker & Docker Compose

---

# Next.js Multi-Zones Projesi

Bu proje Next.js Multi-Zones kullanarak iki ayrı uygulamadan oluşur:

- **Home** (port 3000): Ana uygulama - Ürünler
- **Cart** (port 3001): Sepet uygulaması

## Proje Yapısı

```
/
├── apps/
│   ├── home/          # Ana uygulama
│   └── cart/          # Sepet uygulaması
├── shared/            # Ortak componentler ve kod
└── package.json       # Root package.json
```

## Geliştirme

### Her iki uygulamayı birlikte çalıştır:

```bash
npm run dev
```

### Uygulamaları ayrı ayrı çalıştır:

```bash
npm run dev:home   # Home uygulaması (port 3000)
npm run dev:cart   # Cart uygulaması (port 3001)
```

## Docker ile Çalıştırma

```bash
# Build ve Run
docker compose up --build

# Arka planda
docker compose up -d

# Durdur
docker compose down

# Logları göster
docker compose logs -f
```

> **Not:** Eski Docker sürümlerinde `docker-compose` (tire ile) kullanın.

## URL'ler

### Development:

- Home: http://localhost:3000
- Cart: http://localhost:3000/cart (Next.js rewrites ile)

### Docker:

- Home: http://localhost:3000
- Cart: http://localhost:3000/cart (Next.js rewrites ile)

## Multi-Zone Yapılandırması

- **Home** uygulaması ana uygulama olarak çalışır ve `/cart` path'ini cart uygulamasına yönlendirir
- **Cart** uygulaması `/cart` basePath ile çalışır ve assetPrefix kullanır
- Zone'lar arası navigasyon hard navigation, aynı zone içinde soft navigation olur
- **Nginx gerekmez** - Next.js rewrites ile routing yapılır

## Ortak Componentler

Detaylar için `SHARED_USAGE.md` dosyasına bakın.

## State Yönetimi

- **Zustand** ile global state yönetimi
- **localStorage** ile persist
- Her iki app'te de aynı sepet verisi

## Teknolojiler

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Motion (Framer Motion)
- Docker & Docker Compose
