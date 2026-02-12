# 🗄️ Database Migrations & Seed Scripts - Complete Guide

## 📋 Overview

Your Climatrix project now has:
- ✅ Complete PostgreSQL schema (23 models)
- ✅ Database seed script with sample data
- ✅ Prisma Client configuration
- ✅ Migration scripts
- ✅ Verification tools

---

## 🚀 Step-by-Step Setup

### Step 1: Set Up Database Connection

**You need a PostgreSQL database.** Choose one:

#### Option A: Quick Cloud Setup (Recommended)
See [DATABASE_QUICKSTART.md](./DATABASE_QUICKSTART.md) for:
- 🟢 **Supabase** (Free, recommended)
- 🐘 **ElephantSQL** (Free, 20MB)
- 🚂 **Railway** (Free credits)

#### Option B: Local PostgreSQL
Install PostgreSQL on your machine and create a database named `climatrix`.

### Step 2: Configure Environment Variables

1. Your `.env` file is already configured with:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/climatrix?schema=public"
   ```

2. Update with your actual database credentials:
   ```env
   # For Supabase:
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
   
   # For local PostgreSQL:
   DATABASE_URL="postgresql://postgres:[PASSWORD]@localhost:5432/climatrix"
   ```

### Step 3: Verify Database Connection

```bash
npm run db:verify
```

This will:
- ✅ Test database connection
- ✅ Check if tables exist
- ✅ Show record counts
- ❌ Show helpful error messages if something is wrong

---

## 🛠️ Migration Commands

### Generate Prisma Client
**Run this first** to generate the Prisma Client from your schema:
```bash
npm run db:generate
```

### Push Schema to Database (Development)
**Recommended for development** - directly syncs schema without migration files:
```bash
npm run db:push
```

This will:
- Create all 23 database tables
- Add indexes and constraints
- Skip migration history

### Create Migration (Production)
**Recommended for production** - creates version-controlled migration files:
```bash
npm run db:migrate
```

When prompted, name your migration (e.g., "init" or "initial_schema")

This will:
- Create migration files in `prisma/migrations/`
- Apply the migration to your database
- Track migration history

---

## 🌱 Seeding the Database

### Run the Seed Script
```bash
npm run db:seed
```

### What Gets Created:

#### 👤 **Users (3)**
| Email | Password | Role | City |
|-------|----------|------|------|
| admin@climatrix.com | password123 | ADMIN | New Delhi |
| john.doe@example.com | password123 | USER | Mumbai |
| jane.smith@example.com | password123 | ANALYST | Bangalore |

#### 🌍 **Climate Data**
- **72 climate readings** (24 hours × 3 cities)
- **3 air gas composition** records (CO2, CH4, N2O)
- **2 environmental alerts** (Air Quality + Heat Wave)

#### 👥 **Community**
- **2 groups**: Delhi Green Warriors, Mumbai Sustainability Network
- **4 group memberships**
- **2 posts** with engagement metrics
- **2 comments**
- **3 environmental pledges**

#### 📦 **Supply Chain**
- **2 supply chain items** (Organic Cotton T-Shirts, Solar Panels)
- **3 tracking events** (departure, checkpoint, arrival)
- **Environmental metrics** (carbon footprint, energy used, waste)

#### 📊 **Other**
- **2 user alerts**
- **2 notifications**
- **2 data subscriptions**
- **4 system settings**

---

## 🎯 Complete Workflow

### For First-Time Setup:
```bash
# 1. Verify database connection
npm run db:verify

# 2. Generate Prisma Client
npm run db:generate

# 3. Push schema to database
npm run db:push

# 4. Seed with sample data
npm run db:seed

# 5. Open Prisma Studio to view data
npm run db:studio
```

### When Schema Changes:
```bash
# 1. Edit prisma/schema.prisma

# 2. Push changes
npm run db:push

# 3. Regenerate client
npm run db:generate

# 4. Restart your app
```

### For Production Deployment:
```bash
# 1. Set production DATABASE_URL
export DATABASE_URL="postgresql://..."

# 2. Run migrations
npm run db:migrate

# 3. Generate Prisma Client
npm run db:generate

# 4. DO NOT seed in production (or create production seed data)

# 5. Build and deploy
npm run build
```

---

## 🎨 Prisma Studio

**Visual database browser** - view and edit data:
```bash
npm run db:studio
```

Opens at: http://localhost:5555

Features:
- Browse all tables
- View relationships
- Edit data directly
- Filter and search
- Copy data as JSON

---

## 🧪 Testing the Database

### Test API Routes
After seeding, test the API routes:

```bash
# Get latest climate data
curl http://localhost:3000/api/climate/latest?city=Mumbai

# Get 48-hour history
curl http://localhost:3000/api/climate/history?city=Delhi&hours=48

# Get active alerts
curl http://localhost:3000/api/alerts/active

# Get community groups
curl http://localhost:3000/api/community/groups
```

### Test from Code
```typescript
import { prisma } from '@/lib/prisma';

// Get latest climate reading
const data = await prisma.climateReading.findFirst({
  where: { city: 'Mumbai' },
  orderBy: { readingTime: 'desc' }
});

// Get user with profile
const user = await prisma.user.findUnique({
  where: { email: 'admin@climatrix.com' },
  include: { profile: true }
});
```

---

## 🔄 Database Management

### Reset Database
**WARNING: Deletes all data!**
```bash
npx prisma migrate reset
```

This will:
- Drop the database
- Recreate it
- Run all migrations
- Run seed script

### Reset with db:push
```bash
npm run db:push -- --force-reset
npm run db:seed
```

### Backup Database
```bash
# PostgreSQL dump
pg_dump -U postgres -d climatrix > backup.sql

# Restore
psql -U postgres -d climatrix < backup.sql
```

---

## 📊 Database Statistics

After seeding, your database will have:

```
Total Records: ~100+
├── Users: 3
├── Profiles: 3
├── Climate Readings: 72
├── Air Gas Composition: 3
├── Environmental Alerts: 2
├── Groups: 2
├── Group Members: 4
├── Posts: 2
├── Comments: 2
├── Environmental Pledges: 3
├── Supply Chain Items: 2
├── Supply Chain Events: 3
├── Alerts: 2
├── Notifications: 2
├── Data Subscriptions: 2
└── System Settings: 4
```

---

## 🐛 Troubleshooting

### "Can't reach database server"
```bash
# 1. Verify DATABASE_URL in .env
# 2. Test connection
npm run db:verify

# 3. Check if database server is running
# For local PostgreSQL:
# - Windows: Check Services
# - Mac: brew services list
# - Linux: systemctl status postgresql
```

### "Database does not exist"
```bash
# Create database manually:
psql -U postgres
CREATE DATABASE climatrix;
\q

# Then run:
npm run db:push
```

### "Prisma Client not found"
```bash
npm run db:generate
```

### "Authentication failed"
```bash
# Check DATABASE_URL credentials
# Ensure password is correct
# URL-encode special characters in password
```

### Seed Script Errors
```bash
# Clear existing data first
npm run db:push -- --force-reset

# Then seed again
npm run db:seed
```

---

## 📁 File Structure

```
frontend/
├── prisma/
│   ├── schema.prisma          # Database schema (23 models)
│   ├── seed.js                # Seed script
│   └── migrations/            # Migration files (if using db:migrate)
├── scripts/
│   └── verify-db.js           # Database verification tool
├── src/
│   ├── lib/
│   │   └── prisma.ts          # Prisma Client singleton
│   ├── generated/
│   │   └── prisma/            # Generated Prisma Client (auto-generated)
│   └── app/
│       └── api/
│           ├── climate/
│           │   ├── latest/route.ts
│           │   └── history/route.ts
│           ├── alerts/
│           │   └── active/route.ts
│           └── community/
│               └── groups/route.ts
├── .env                       # Environment variables
├── .env.example               # Environment template
├── DATABASE_SCHEMA.md         # Schema documentation
├── DATABASE_SETUP.md          # Setup guide
├── DATABASE_QUICKSTART.md     # Quick database setup options
└── MIGRATIONS_GUIDE.md        # This file
```

---

## 🎯 Next Steps

1. ✅ **Set up database** (see DATABASE_QUICKSTART.md)
2. ✅ **Verify connection** (`npm run db:verify`)
3. ✅ **Push schema** (`npm run db:push`)
4. ✅ **Seed data** (`npm run db:seed`)
5. ✅ **View in Studio** (`npm run db:studio`)
6. 🔨 **Build features** using the API and Prisma Client
7. 🚀 **Deploy** to production

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Detailed schema docs
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Setup instructions

---

## ✅ Quick Reference

```bash
# Database Setup
npm run db:verify           # Test connection
npm run db:generate         # Generate Prisma Client
npm run db:push             # Push schema (dev)
npm run db:migrate          # Create migration (prod)
npm run db:seed             # Seed sample data
npm run db:studio           # Open visual editor

# Development
npm run dev                 # Start Next.js dev server
npm run build               # Build for production
npm run start               # Start production server

# Useful Commands
npx prisma migrate reset              # Reset database
npx prisma migrate status             # Check migration status
npx prisma format                     # Format schema file
npx prisma validate                   # Validate schema
npx prisma db pull                    # Introspect existing database
```

---

**🎉 You're all set! Your database migrations and seed scripts are ready to use!**

For any issues, check the troubleshooting section or refer to the documentation files.
