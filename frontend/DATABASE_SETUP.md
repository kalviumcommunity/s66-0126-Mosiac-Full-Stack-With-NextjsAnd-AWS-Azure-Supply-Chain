# Climatrix Database Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

This will install:
- `@prisma/client` - Prisma database client
- `bcryptjs` - Password hashing library
- `prisma` - Prisma CLI (dev dependency)

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
copy .env.example .env
```

Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/climatrix?schema=public"
```

#### Database URL Examples:

**Local PostgreSQL:**
```
postgresql://postgres:mypassword@localhost:5432/climatrix
```

**AWS RDS:**
```
postgresql://admin:password@climatrix.xxxxx.us-east-1.rds.amazonaws.com:5432/climatrix
```

**Azure Database for PostgreSQL:**
```
postgresql://admin@servername:password@servername.postgres.database.azure.com:5432/climatrix?sslmode=require
```

**Supabase:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

### 3. Generate Prisma Client

Generate the Prisma Client based on your schema:
```bash
npm run db:generate
```

### 4. Create Database Schema

You have two options:

#### Option A: Push Schema (for development)
Quickly sync your schema without creating migrations:
```bash
npm run db:push
```

#### Option B: Create Migration (recommended for production)
Create a migration for version-controlled schema changes:
```bash
npm run db:migrate
# When prompted, name your migration: "init" or "initial_schema"
```

### 5. Seed the Database (Optional)

Populate your database with sample data:
```bash
npm run db:seed
```

This creates:
- 3 test users (admin, john.doe, jane.smith)
- 72 climate readings (24 hours × 3 cities)
- 3 air gas composition records
- 2 environmental alerts
- 2 community groups with members
- 2 posts with comments
- 3 environmental pledges
- 2 supply chain items with tracking events
- User alerts and notifications
- Data subscriptions
- System settings

**Test User Credentials:**
- Email: `admin@climatrix.com` | Password: `password123` | Role: ADMIN
- Email: `john.doe@example.com` | Password: `password123` | Role: USER
- Email: `jane.smith@example.com` | Password: `password123` | Role: ANALYST

### 6. View Database in Prisma Studio

Open Prisma Studio to browse and edit your data:
```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555`

---

## Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema changes to database (no migration) |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

---

## Common Tasks

### Reset Database and Reseed
```bash
# Option 1: Drop and recreate
npx prisma migrate reset

# Option 2: Manual reset
npx prisma db push --force-reset
npm run db:seed
```

### Update Schema
1. Edit `prisma/schema.prisma`
2. Run migration:
   ```bash
   npm run db:migrate
   ```
3. Regenerate Prisma Client:
   ```bash
   npm run db:generate
   ```

### Query Database from Code

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

```typescript
// Example: Fetch latest climate data
import { prisma } from '@/lib/prisma';

export async function getLatestClimateData(city: string) {
  return await prisma.climateReading.findFirst({
    where: { city },
    orderBy: { readingTime: 'desc' },
  });
}
```

---

## Troubleshooting

### Error: "Can't reach database server"
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Ensure firewall allows connection
- For cloud databases, check IP allowlist

### Error: "Database does not exist"
1. Create the database manually:
   ```sql
   CREATE DATABASE climatrix;
   ```
2. Or use Prisma to create it:
   ```bash
   npx prisma db push
   ```

### Error: "Prisma Client not found"
Run:
```bash
npm run db:generate
```

### Schema Changes Not Reflecting
1. Regenerate client: `npm run db:generate`
2. Restart Next.js dev server
3. Clear `.next` folder: `rm -rf .next`

---

## Production Deployment

### 1. Set Production Environment Variables
```env
DATABASE_URL="postgresql://..."
NODE_ENV=production
```

### 2. Run Migrations
```bash
npx prisma migrate deploy
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Build Application
```bash
npm run build
```

---

## Best Practices

1. **Never commit `.env`** - Keep it in `.gitignore`
2. **Use migrations in production** - Don't use `db push`
3. **Connection pooling** - Use connection poolers (PgBouncer) for serverless
4. **Backup regularly** - Automate database backups
5. **Monitor queries** - Enable Prisma query logging in development
6. **Index optimization** - Review and optimize indexes based on query patterns

---

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Schema Documentation](./DATABASE_SCHEMA.md)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

## Need Help?

- Check the [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for detailed schema documentation
- Review Prisma logs for detailed error messages
- Ensure all environment variables are correctly set

---

*Last Updated: February 11, 2026*
