# 🐳 Docker Setup Guide

## Quick Start

### Prerequisites
- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

### 1. Configure Environment Variables

Copy the template and update with your values:
```bash
cp .env.docker .env
```

**Important:** Generate secure secrets for production:
```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

Update `.env` with the generated secrets.

### 2. Build and Start Services

**Start all services:**
```bash
docker-compose up -d
```

This will start:
- **PostgreSQL** on port 5432
- **Redis** on port 6379
- **Next.js App** on port 3000
- **Weather Server** on port 5001

**View logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
```

### 3. Access the Application

- **Frontend:** http://localhost:3000
- **Weather API:** http://localhost:5001

### 4. Database Management

**Run migrations:**
```bash
docker-compose exec app npx prisma migrate deploy
```

**Seed database:**
```bash
docker-compose exec app npx prisma db seed
```

**Access Prisma Studio:**
```bash
docker-compose exec app npx prisma studio
```

**Access PostgreSQL directly:**
```bash
docker-compose exec postgres psql -U postgres -d Digital-Shadow
```

## Common Commands

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes all data)
```bash
docker-compose down -v
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### View running containers
```bash
docker-compose ps
```

### Access app shell
```bash
docker-compose exec app sh
```

## Troubleshooting

### Port conflicts
If ports are already in use, modify them in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change 3001 to any available port
```

### Database connection issues
Check if PostgreSQL is healthy:
```bash
docker-compose ps postgres
```

### Clear cache and rebuild
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### View detailed logs
```bash
docker-compose logs --tail=100 -f app
```

## Production Deployment

### 1. Update environment variables
- Set `NODE_ENV=production`
- Use strong secrets for `JWT_SECRET` and `NEXTAUTH_SECRET`
- Update `NEXT_PUBLIC_APP_URL` to your domain

### 2. Use production compose file
Create `docker-compose.prod.yml` with production configurations

### 3. Deploy to cloud
Options:
- **AWS ECS/EKS**
- **Azure Container Apps**
- **Google Cloud Run**
- **DigitalOcean App Platform**
- **Railway**
- **Render**

## Architecture

```
┌─────────────────┐
│   Next.js App   │ :3000
│  (Frontend/API) │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌──────────┐
│PostgreSQL│ │  Redis   │
│  :5432   │ │  :6379   │
└─────────┘ └──────────┘
         │
         ▼
┌─────────────────┐
│ Weather Server  │ :5001
│  (OpenWeather)  │
└─────────────────┘
```

## Data Persistence

Data is persisted in Docker volumes:
- `postgres_data`: Database files
- `redis_data`: Redis cache

To backup:
```bash
docker run --rm -v climatrix_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data
```

## Health Checks

Services include health checks:
- PostgreSQL: `pg_isready`
- Redis: `redis-cli ping`

Check health status:
```bash
docker-compose ps
```

## Network

All services run on the `climatrix-network` bridge network, allowing inter-service communication using service names (e.g., `postgres:5432`).
