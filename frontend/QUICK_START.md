# ⚡ Quick Start Guide - Climatrix Backend

Get your backend up and running in 5 minutes!

---

## 📋 Prerequisites

- ✅ Node.js 18+ installed
- ✅ PostgreSQL database (local or cloud)
- ✅ Redis (local or cloud)

---

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
cd frontend
npm install
```

**Packages installed:**
- Next.js, React, TypeScript
- Prisma (ORM)
- Redis & ioredis (caching)
- Zod (validation)
- Jose & bcryptjs (authentication)
- And more...

---

### 2. Set Up Database

**Option A: Cloud Database (Recommended for Quick Start)**

Choose one:

**Supabase (Free, Easy):**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database
4. Format: `postgresql://postgres:[password]@[host]:[port]/postgres`

**Railway (Free, Easy):**
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Copy `DATABASE_URL` from Variables tab

**ElephantSQL (Free tier available):**
1. Go to [elephantsql.com](https://www.elephantsql.com)
2. Create new instance (Tiny Turtle - Free)
3. Copy connection URL

**Option B: Local PostgreSQL**

```bash
# Windows (using Chocolatey)
choco install postgresql

# Or download from postgresql.org
```

---

### 3. Set Up Redis

**Option A: Cloud Redis (Easiest)**

**Upstash (Free, Recommended):**
1. Go to [upstash.com](https://upstash.com)
2. Create Redis database
3. Copy connection string
4. Format: `redis://default:[password]@[host]:[port]`

**Option B: Local Redis**

```bash
# Windows (using WSL or Memurai)
# Download Memurai: https://www.memurai.com/get-memurai
# Or use Redis in WSL
```

---

### 4. Configure Environment

Create/update `frontend/.env`:

```env
# Database (from Step 2)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Redis (from Step 3)
REDIS_URL="redis://localhost:6379"
# Or from Upstash: redis://default:password@host:port

# Authentication (generate a secure secret)
JWT_SECRET="your-super-secret-32-character-key-here"
JWT_EXPIRES_IN="7d"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Cache TTLs (optional, these are defaults)
CACHE_TTL_SHORT=300      # 5 minutes
CACHE_TTL_MEDIUM=1800    # 30 minutes
CACHE_TTL_LONG=3600      # 1 hour
```

**Generate JWT Secret:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online generator
# https://generate-random.org/encryption-key-generator
```

---

### 5. Initialize Database

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

**Expected Output:**
```
✅ Schema pushed successfully
✅ Created 5 users
✅ Created 120 climate readings
✅ Created 15 alerts
✅ Created 8 groups
✅ Created 20 posts
✅ Database seeded successfully!
```

---

### 6. Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.1.4
- Local:        http://localhost:3000
- Ready in 2.5s
```

---

## ✅ Verify Installation

### Test 1: Check Database Connection

Visit: http://localhost:3000/api/climate/latest?city=Mumbai

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "city": "Mumbai",
    "temperature": 28.5,
    "aqi": 150,
    "timestamp": "2024-01-15T..."
  }
}
```

### Test 2: Check Authentication

**Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"username\":\"testuser\",\"password\":\"Test1234\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "eyJ..."
  }
}
```

### Test 3: Check Redis Caching

1. Visit: http://localhost:3000/api/climate/latest?city=Delhi
2. Check response time (should be ~100-200ms)
3. Visit same URL again
4. Check response time (should be <10ms - cached!)

---

## 🎯 Next Steps

### 1. Explore the UI

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/auth/login
- **Dashboard:** http://localhost:3000/dashboard
- **Community:** http://localhost:3000/community

### 2. Test Authentication Flow

1. Go to `/auth/signup`
2. Create account with:
   - Email: `demo@climatrix.com`
   - Username: `demo`
   - Password: `Demo1234`
   - City: `Mumbai`

3. You'll be auto-logged in
4. Visit `/dashboard` to see data

### 3. Use Seeded Data

**Test Accounts:**
```
Email: admin@climatrix.com
Password: Admin123
Role: ADMIN

Email: john.doe@example.com
Password: Password123
Role: USER
```

**Test Cities:**
- Mumbai
- Delhi
- Bangalore
- Chennai
- Kolkata

### 4. Integrate with Frontend

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for:
- Using authentication hooks
- Making API calls
- Caching strategies
- Error handling

---

## 🛠️ Troubleshooting

### Issue: Database connection failed

**Error:** `P1001: Can't reach database server`

**Solution:**
1. Check `DATABASE_URL` in `.env`
2. Verify database is running
3. Test connection: `psql $DATABASE_URL`
4. Check firewall/security groups

### Issue: Redis connection failed

**Error:** `ECONNREFUSED 127.0.0.1:6379`

**Solution:**
1. Check if Redis is running:
   ```bash
   redis-cli ping  # Should return PONG
   ```
2. Check `REDIS_URL` in `.env`
3. For Upstash, verify connection string format
4. Try: `redis://default:password@host:port`

### Issue: JWT errors

**Error:** `JWT verification failed`

**Solution:**
1. Ensure `JWT_SECRET` is set in `.env`
2. Must be at least 32 characters
3. Clear browser cookies
4. Try logging in again

### Issue: Prisma client not found

**Error:** `@prisma/client did not initialize yet`

**Solution:**
```bash
npm run db:generate
# Or
npx prisma generate
```

### Issue: Validation errors

**Error:** `Validation failed`

**Solution:**
- Check request body matches schema
- See [API_REFERENCE.md](./API_REFERENCE.md) for field requirements
- Example: password min 6 chars, username 3-30 chars

### Issue: Seed data already exists

**Error:** `Unique constraint failed`

**Solution:**
```bash
# Reset database
npm run db:reset

# Or manually
npx prisma db push --force-reset
npm run db:seed
```

---

## 📚 Useful Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npm run db:push               # Push schema changes
npm run db:generate           # Generate Prisma client
npm run db:seed               # Seed database
npm run db:reset              # Reset and reseed
npm run db:studio             # Open Prisma Studio

# Production
npm run build                 # Build for production
npm start                     # Start production server

# Verification
npm run verify-db             # Check database connection
```

---

## 🔍 Testing API Endpoints

### Using cURL

```bash
# Get climate data
curl "http://localhost:3000/api/climate/latest?city=Mumbai"

# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","username":"testuser","password":"Test1234"}'

# Get alerts
curl "http://localhost:3000/api/alerts/active?severity=HIGH"
```

### Using Browser

Simply visit URLs in your browser:

```
http://localhost:3000/api/climate/latest?city=Delhi
http://localhost:3000/api/alerts/active
http://localhost:3000/api/community/groups?city=Mumbai
```

### Using Postman/Thunder Client

1. Import base URL: `http://localhost:3000/api`
2. Test endpoints from [API_REFERENCE.md](./API_REFERENCE.md)
3. For authenticated routes, login first to get cookie

---

## 📊 Check Data with Prisma Studio

```bash
npm run db:studio
```

Opens GUI at http://localhost:5555 where you can:
- Browse all tables
- View/edit data
- Run queries
- Check relationships

---

## 🎨 Frontend Integration Examples

### Use Authentication

```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  return user ? (
    <div>Welcome, {user.username}!</div>
  ) : (
    <button onClick={() => login(email, password)}>
      Login
    </button>
  );
}
```

### Fetch Climate Data

```typescript
import { useLatestClimate } from '@/hooks/useAPI';

function Dashboard() {
  const { data, loading, error } = useLatestClimate('Mumbai');
  
  if (loading) return <div>Loading...</div>;
  
  return <div>Temp: {data.temperature}°C</div>;
}
```

### Create Post

```typescript
import { useCreatePost } from '@/hooks/useAPI';

function CreatePost() {
  const { mutate, loading } = useCreatePost();
  
  const handleSubmit = async () => {
    await mutate({
      title: 'My Post',
      content: 'Post content'
    });
  };
  
  return <button onClick={handleSubmit}>Create</button>;
}
```

---

## 📖 Documentation

- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Complete integration guide
- **[API_REFERENCE.md](./API_REFERENCE.md)** - API endpoint documentation
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Database structure
- **[DATABASE_QUICKSTART.md](./DATABASE_QUICKSTART.md)** - Database setup guide

---

## 🎉 You're Ready!

Your backend is now configured with:
- ✅ PostgreSQL database with 23 models
- ✅ Redis caching layer
- ✅ JWT authentication
- ✅ Input validation with Zod
- ✅ 15+ API endpoints
- ✅ Frontend integration (hooks, context)
- ✅ Sample data for testing

**Start building features!** 🚀

Test the app:
1. Visit http://localhost:3000
2. Sign up / Login
3. Explore dashboard
4. Check community features
5. Create pledges

Need help? Check:
- [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for detailed usage
- [API_REFERENCE.md](./API_REFERENCE.md) for endpoint specs
- [Troubleshooting](#-troubleshooting) section above

---

**Happy coding!** 💻🌍
