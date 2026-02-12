# 🚀 Quick Database Setup Guide

Your PostgreSQL schema is ready! Now you need a database server. Choose ONE of these options:

---

## ⚡ FASTEST Option: Supabase (Recommended - 5 minutes)

**Free tier includes:** 500MB database, unlimited API requests

### Steps:
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up with GitHub (free)
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `climatrix`
   - Database Password: (create a strong password - **save this!**)
   - Region: Choose closest to you
6. Wait 2 minutes for project to set up
7. Go to **Settings** → **Database**
8. Copy the **Connection String** (URI format)
9. Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
   ```
10. Replace `[YOUR-PASSWORD]` with your actual password

### Then run:
```bash
npm run db:push
npm run db:seed
```

---

## 🐘 Option 2: ElephantSQL (Free Tier - 3 minutes)

**Free tier includes:** 20MB storage, perfect for development

### Steps:
1. Go to [https://www.elephantsql.com](https://www.elephantsql.com)
2. Sign up (free)
3. Click "Create New Instance"
4. Name: `climatrix-dev`
5. Plan: **Tiny Turtle (Free)**
6. Select region closest to you
7. Click "Review" then "Create Instance"
8. Click on your instance
9. Copy the **URL** field
10. Paste into your `.env`:
    ```env
    DATABASE_URL="[paste the URL here]"
    ```

### Then run:
```bash
npm run db:push
npm run db:seed
```

---

## 🚂 Option 3: Railway (Free with GitHub - 5 minutes)

**Free tier includes:** $5/month credit

### Steps:
1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Provision PostgreSQL"
5. Wait for deployment
6. Click on PostgreSQL service
7. Go to **Variables** tab
8. Copy the **DATABASE_URL** value
9. Paste into your `.env` file

### Then run:
```bash
npm run db:push
npm run db:seed
```

---

## 🏠 Option 4: Local PostgreSQL Install (30 minutes)

### For Windows:
1. Download PostgreSQL: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run installer (use default settings)
3. Remember your **postgres** user password!
4. Open pgAdmin (installed with PostgreSQL)
5. Right-click "Databases" → Create → Database
6. Name: `climatrix`
7. Update `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@localhost:5432/climatrix"
   ```

### Then run:
```bash
npm run db:push
npm run db:seed
```

---

## 🎯 What to Run After Setting Up Database

Once your `DATABASE_URL` is configured in `.env`:

```bash
# 1. Push schema to database
npm run db:push

# 2. Seed with sample data
npm run db:seed

# 3. View your data in Prisma Studio
npm run db:studio
```

---

## ✅ Verify Setup

Test the database connection:
```bash
npx prisma db execute --stdin <<< "SELECT 1"
```

If successful, you'll see: `Executed in ... ms`

---

## 🧪 Sample Data After Seeding

You'll get:
- **3 test users**
  - admin@climatrix.com (password: password123)
  - john.doe@example.com (password: password123)
  - jane.smith@example.com (password: password123)
- **72 climate readings** (3 cities × 24 hours)
- **2 community groups** with posts
- **2 supply chain items** with tracking
- All other models populated with sample data

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
- Verify `DATABASE_URL` is correct in `.env`
- Check if database server is running
- For cloud databases, check firewall/IP whitelist

### Error: "Authentication failed"
- Double-check password in `DATABASE_URL`
- Make sure special characters in password are URL-encoded

### Error: "Database does not exist"
- Create the database manually in your PostgreSQL client
- Or use Supabase/Railway which auto-creates it

---

## 💡 Recommended for Production

- **Supabase** - Best free tier, built for Next.js
- **AWS RDS** - Enterprise grade
- **Azure Database for PostgreSQL** - Azure integrations

---

**Next Step:** Choose an option above, set up your database, then run the migrations! 🚀
