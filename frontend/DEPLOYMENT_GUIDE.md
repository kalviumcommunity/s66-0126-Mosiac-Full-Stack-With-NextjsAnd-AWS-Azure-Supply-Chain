# 🚀 Deployment Guide - Climatrix

Deploy your full-stack application to production with this comprehensive guide.

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Redis connected and tested
- [ ] Build succeeds without errors
- [ ] Authentication flow works
- [ ] API endpoints tested
- [ ] Error handling implemented

---

## 🌐 Deployment Platforms

### Option 1: Vercel (Recommended for Next.js)

**Pros:**
- ✅ Zero-config Next.js deployment
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Free tier available

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Configure Environment Variables**
   
   Go to Vercel Dashboard → Project → Settings → Environment Variables
   
   Add all from `.env`:
   ```
   DATABASE_URL
   REDIS_URL
   JWT_SECRET
   JWT_EXPIRES_IN
   NEXT_PUBLIC_APP_URL
   NODE_ENV=production
   CACHE_TTL_SHORT
   CACHE_TTL_MEDIUM
   CACHE_TTL_LONG
   ```

4. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

5. **Push Database Schema**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

---

### Option 2: Railway

**Pros:**
- ✅ Built-in PostgreSQL
- ✅ Built-in Redis
- ✅ Simple deployment
- ✅ Automatic HTTPS

**Steps:**

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add Services**
   
   Add PostgreSQL:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-generates `DATABASE_URL`
   
   Add Redis:
   - Click "New" → "Database" → "Add Redis"
   - Railway auto-generates `REDIS_URL`

4. **Configure Environment Variables**
   
   In your app service settings:
   ```
   JWT_SECRET=your-secret-here
   JWT_EXPIRES_IN=7d
   NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app
   NODE_ENV=production
   CACHE_TTL_SHORT=300
   CACHE_TTL_MEDIUM=1800
   CACHE_TTL_LONG=3600
   ```

5. **Deploy**
   - Railway auto-deploys on git push
   - Or use Railway CLI: `railway up`

6. **Run Migrations**
   ```bash
   railway run npx prisma db push
   railway run npx prisma db seed
   ```

---

### Option 3: AWS (Advanced)

**Architecture:**
- EC2/ECS for Next.js app
- RDS for PostgreSQL
- ElastiCache for Redis
- S3 + CloudFront for static assets
- Route 53 for DNS

**Setup:**

1. **Create RDS Database**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier climatrix-db \
     --engine postgres \
     --db-instance-class db.t3.micro \
     --allocated-storage 20
   ```

2. **Create ElastiCache Redis**
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id climatrix-cache \
     --engine redis \
     --cache-node-type cache.t3.micro
   ```

3. **Deploy to EC2/ECS**
   
   Create Dockerfile:
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY frontend/package*.json ./
   RUN npm install
   
   COPY frontend/ ./
   RUN npx prisma generate
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

4. **Environment Variables**
   
   Use AWS Secrets Manager or .env file:
   ```env
   DATABASE_URL=postgres://user:pass@rds-endpoint:5432/climatrix
   REDIS_URL=redis://elasticache-endpoint:6379
   JWT_SECRET=xxxxx
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

5. **Set up Load Balancer**
   ```bash
   aws elbv2 create-load-balancer \
     --name climatrix-lb \
     --subnets subnet-xxx subnet-yyy
   ```

---

### Option 4: Azure (Advanced)

**Architecture:**
- Azure App Service for Next.js
- Azure Database for PostgreSQL
- Azure Cache for Redis
- Azure CDN for static assets

**Setup:**

1. **Create Resources**
   ```bash
   # Resource Group
   az group create --name climatrix-rg --location eastus
   
   # PostgreSQL
   az postgres flexible-server create \
     --resource-group climatrix-rg \
     --name climatrix-db \
     --location eastus
   
   # Redis
   az redis create \
     --resource-group climatrix-rg \
     --name climatrix-cache \
     --location eastus \
     --sku Basic
   
   # App Service
   az webapp create \
     --resource-group climatrix-rg \
     --plan climatrix-plan \
     --name climatrix-app \
     --runtime "NODE:18-lts"
   ```

2. **Configure App Settings**
   ```bash
   az webapp config appsettings set \
     --resource-group climatrix-rg \
     --name climatrix-app \
     --settings \
       DATABASE_URL="postgres://..." \
       REDIS_URL="redis://..." \
       JWT_SECRET="xxx"
   ```

3. **Deploy**
   ```bash
   az webapp deployment source config-zip \
     --resource-group climatrix-rg \
     --name climatrix-app \
     --src app.zip
   ```

---

## 🗄️ Database Deployment

### PostgreSQL Options

#### 1. Supabase (Recommended)
- **Free tier:** 500MB database, 2GB bandwidth
- **Managed:** Automatic backups, scaling
- **Setup:**
  1. Create project at [supabase.com](https://supabase.com)
  2. Copy connection string
  3. Run migrations: `npx prisma db push`

#### 2. Railway PostgreSQL
- **Free tier:** 512MB RAM, 1GB storage
- **Built-in:** No separate setup needed
- **Auto-backup:** Daily backups included

#### 3. AWS RDS
- **Scalable:** From micro to large instances
- **Reliable:** 99.95% uptime SLA
- **Price:** $13/month minimum

#### 4. Azure Database for PostgreSQL
- **Flexible:** Scale up/down easily
- **Secure:** Built-in security features
- **Price:** $20/month minimum

### Migration Strategy

**Development to Production:**

1. **Export schema**
   ```bash
   npx prisma migrate dev --create-only
   ```

2. **Review migration SQL**
   ```bash
   cat prisma/migrations/xxx/migration.sql
   ```

3. **Apply to production**
   ```bash
   DATABASE_URL="postgres://prod..." npx prisma migrate deploy
   ```

4. **Seed production data** (optional)
   ```bash
   DATABASE_URL="postgres://prod..." npm run db:seed
   ```

---

## 🔴 Redis Deployment

### Redis Options

#### 1. Upstash (Recommended)
- **Free tier:** 10,000 commands/day
- **Serverless:** Pay per use
- **Global:** Low latency worldwide
- **Setup:** [console.upstash.com](https://console.upstash.com)

#### 2. Redis Cloud
- **Free tier:** 30MB storage
- **Managed:** Automatic failover
- **Setup:** [redis.com/cloud](https://redis.com/try-free)

#### 3. Railway Redis
- **Simple:** One-click deploy
- **Built-in:** No separate account
- **Auto-connect:** Environment variables set

#### 4. AWS ElastiCache
- **Scalable:** Multiple instance types
- **Reliable:** Multi-AZ deployment
- **Price:** $15/month minimum

### Redis Configuration

**Eviction Policy:**
```bash
redis-cli CONFIG SET maxmemory-policy allkeys-lru
```

**Persistence:**
```bash
# For caching, persistence not required
redis-cli CONFIG SET save ""
```

---

## 🔐 Security Checklist

### Environment Variables

- [ ] `JWT_SECRET` is at least 32 characters
- [ ] Database credentials are strong
- [ ] No secrets in git repository
- [ ] Environment-specific URLs set
- [ ] `NODE_ENV=production` set

### Database Security

- [ ] SSL/TLS enabled for connections
- [ ] Firewall rules restrict access
- [ ] Regular backups configured
- [ ] Strong database password
- [ ] Least privilege user accounts

### Application Security

- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention (React auto-escaping)
- [ ] CSRF protection (httpOnly cookies)

### Code Security

```typescript
// lib/api-utils.ts - CORS Configuration
const ALLOWED_ORIGINS = process.env.NODE_ENV === 'production'
  ? ['https://yourdomain.com']
  : ['http://localhost:3000'];

// Rate limiting per IP
const rateLimiter = new RateLimiter(100, 60000); // 100 req/min
```

---

## 📊 Monitoring & Logging

### Error Tracking

**Sentry Integration:**

1. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure**
   ```typescript
   // sentry.config.ts
   import * as Sentry from '@sentry/nextjs';
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

3. **Add to API routes**
   ```typescript
   try {
     // API logic
   } catch (error) {
     Sentry.captureException(error);
     throw error;
   }
   ```

### Performance Monitoring

**Vercel Analytics:**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Custom Logging:**
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ level: 'info', message, meta }));
  },
  error: (message: string, error?: Error) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error?.message,
      stack: error?.stack 
    }));
  }
};
```

---

## 🎯 Performance Optimization

### Caching Strategy

**Redis TTLs (Production):**
```env
CACHE_TTL_SHORT=300      # 5 minutes - real-time data
CACHE_TTL_MEDIUM=1800    # 30 minutes - semi-static
CACHE_TTL_LONG=3600      # 1 hour - static data
```

**Database Indexing:**
```prisma
// prisma/schema.prisma
model ClimateReading {
  // Add indexes for frequently queried fields
  @@index([city, timestamp])
  @@index([timestamp])
}

model Alert {
  @@index([city, isActive])
  @@index([severity, isActive])
}
```

### Next.js Optimizations

**Static Generation:**
```typescript
// app/about/page.tsx
export const dynamic = 'force-static';
```

**Revalidation:**
```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

**Image Optimization:**
```typescript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={100}
  priority // For above-fold images
/>
```

---

## 📦 Build Configuration

### Production Build

**next.config.mjs:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Build Commands

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "next start -p $PORT",
    "postinstall": "prisma generate"
  }
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      
      - name: Generate Prisma Client
        run: |
          cd frontend
          npx prisma generate
      
      - name: Run tests
        run: |
          cd frontend
          npm test
      
      - name: Build
        run: |
          cd frontend
          npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🧪 Pre-Production Testing

### API Testing

```bash
# Test all endpoints
npm run test:api

# Load testing
npm install -g artillery
artillery quick --count 10 --num 100 http://localhost:3000/api/climate/latest?city=Mumbai
```

### Database Testing

```bash
# Check migrations
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-schema-datasource prisma/schema.prisma

# Validate schema
npx prisma validate
```

### Security Testing

```bash
# Check dependencies
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 📈 Scaling Considerations

### Horizontal Scaling

**Load Balancing:**
- Use Vercel (automatic)
- Or AWS ALB/Azure Load Balancer
- Session sharing via Redis

**Database:**
- Read replicas for heavy read loads
- Connection pooling: `connection_limit=20`

**Redis:**
- Redis Cluster for high availability
- Sentinel for automatic failover

### Vertical Scaling

**Database:**
- Start: 512MB RAM
- Growing: 2GB RAM
- Large: 8GB+ RAM

**Redis:**
- Start: 256MB
- Growing: 1GB
- Large: 4GB+

---

## 💰 Cost Estimates

### Free Tier (Getting Started)
- **Vercel:** Free (hobby plan)
- **Supabase:** Free (500MB DB)
- **Upstash:** Free (10k requests/day)
- **Total:** $0/month

### Production (Small)
- **Vercel:** $20/month (Pro)
- **Railway PostgreSQL:** $5/month
- **Upstash Redis:** $10/month
- **Total:** $35/month

### Production (Medium)
- **AWS/Azure:** $50-100/month
- **RDS/Azure DB:** $30-50/month
- **ElastiCache/Azure Redis:** $15-30/month
- **Total:** $95-180/month

---

## 🆘 Deployment Troubleshooting

### Build Fails

**Error: `Module not found`**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Error: `Prisma Client not generated`**
```bash
npx prisma generate
npm run build
```

### Database Connection Issues

**Error: `P1001: Can't reach database`**
- Check `DATABASE_URL` format
- Verify IP whitelist (Supabase/Railway)
- Test connection: `psql $DATABASE_URL`

### Redis Connection Issues

**Error: `ECONNREFUSED`**
- Verify `REDIS_URL` format
- Check Redis server status
- Try: `redis-cli -u $REDIS_URL ping`

---

## ✅ Post-Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Sample/production data loaded
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if applicable)
- [ ] Error tracking configured (Sentry)
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Rate limiting tested
- [ ] Authentication flow works
- [ ] All API endpoints tested
- [ ] Performance acceptable (<200ms avg)
- [ ] Status page set up (optional)

---

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Redis Deployment](https://redis.io/docs/manual/admin/)

---

**🎉 Your app is now live in production!**

Monitor performance, gather user feedback, and iterate. Good luck! 🚀
