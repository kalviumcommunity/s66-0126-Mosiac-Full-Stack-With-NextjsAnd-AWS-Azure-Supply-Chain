# Database Setup Instructions

## Prerequisites
- PostgreSQL installed on your system
- Node.js and npm installed

## Step 1: Install PostgreSQL
If you don't have PostgreSQL installed:

### Windows
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember your password for the postgres user
4. Default port is 5432

### Mac
```bash
brew install postgresql
brew services start postgresql
```

### Linux
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Step 2: Create Database

Open PostgreSQL command line (psql):

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE climatrix;

# Exit psql
\q
```

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and update the DATABASE_URL:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/climatrix?schema=public"
   ```
   
   Replace:
   - `postgres` with your PostgreSQL username
   - `your_password` with your PostgreSQL password
   - `localhost` with your database host (if remote)
   - `5432` with your PostgreSQL port
   - `climatrix` with your database name

3. Set a secure JWT_SECRET:
   ```
   JWT_SECRET="your-random-secret-key-at-least-32-characters-long"
   ```

## Step 4: Generate Prisma Client and Run Migrations

```bash
# Install dependencies (if not already done)
npm install

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Or run migrations (if migration files exist)
npx prisma migrate deploy

# (Optional) Seed the database with sample data
npx prisma db seed
```

## Step 5: Verify Database Connection

```bash
# Open Prisma Studio to view your database
npx prisma studio
```

This will open http://localhost:5555 where you can see your database tables.

## Step 6: Run the Application

```bash
npm run dev
```

Visit http://localhost:3000 and try signing up!

## Troubleshooting

### "Can't reach database server"
- Check if PostgreSQL is running: `sudo systemctl status postgresql` (Linux) or check Services (Windows)
- Verify DATABASE_URL is correct
- Check firewall settings

### "Schema does not exist"
- Run `npx prisma db push` to create the schema

### "Module not found: @/generated/prisma"
- Run `npx prisma generate`

### Authentication not working
- Ensure JWT_SECRET is set in .env
- Check browser console for errors
- Verify database has user data: `npx prisma studio`

## Next Steps

Once the database is connected:
1. **Sign Up**: Create a new account at `/auth/signup`
2. **Login**: Use your credentials at `/auth/login`
3. **Profile**: Edit your profile at `/profile` - changes will be saved to the database
4. All user data is now persisted in PostgreSQL!

## Database Schema Overview

The main tables:
- **User**: Stores user accounts (email, password, name, etc.)
- **Profile**: Extended user information (bio, phone, social links)
- **Posts**: Community posts
- **EnvironmentalPledge**: User commitments
- **Group**: Community groups
- **Alert**: Climate alerts

View the full schema in `prisma/schema.prisma`
