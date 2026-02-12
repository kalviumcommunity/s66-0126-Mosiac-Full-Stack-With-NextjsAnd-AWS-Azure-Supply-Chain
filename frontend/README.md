# 🌍 Climatrix - Climate Intelligence & Supply Chain Platform

A comprehensive full-stack platform for climate monitoring, environmental action, and sustainable supply chain management.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Caching-DC382D)](https://redis.io/)

---

## ✨ Features

### 🌡️ Climate Intelligence
- **Real-time Monitoring** - Live temperature, humidity, AQI tracking
- **Historical Analysis** - Trend analysis and pattern recognition
- **Smart Alerts** - AI-powered climate event notifications
- **Multi-city Support** - Track climate across major cities

### 👥 Community Engagement
- **Groups & Forums** - Create and join climate action communities
- **Social Posts** - Share initiatives and success stories
- **Collaborative Actions** - Organize local environmental events

### 🌱 Environmental Pledges
- **Personal Goals** - Set and track sustainability commitments
- **Impact Tracking** - Measure your environmental contribution
- **Achievement System** - Gamified progress tracking

### 📦 Supply Chain Management
- **Carbon Footprint** - Track emissions across supply chain
- **Transparency** - Full visibility into product origins
- **Sustainability Metrics** - Monitor environmental impact

### 🔐 Secure Authentication
- **JWT Authentication** - Secure, stateless authentication
- **Role-based Access** - Admin, moderator, and user roles
- **Profile Management** - Customizable user profiles

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (cloud or local)
- Redis instance (cloud or local)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database and Redis URLs

# Initialize database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit **http://localhost:3000** 🎉

**📖 For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)**

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   ├── climate/         # Climate data endpoints
│   │   │   ├── alerts/          # Alert endpoints
│   │   │   ├── community/       # Community endpoints
│   │   │   ├── posts/           # Posts endpoints
│   │   │   ├── pledges/         # Pledges endpoints
│   │   │   ├── profile/         # Profile endpoints
│   │   │   └── supply-chain/    # Supply chain endpoints
│   │   ├── auth/                # Auth pages (login, signup)
│   │   ├── dashboard/           # Dashboard page & components
│   │   ├── community/           # Community page
│   │   ├── profile/             # Profile page
│   │   ├── settings/            # Settings page
│   │   └── components/          # Shared components
│   ├── context/                 # React Context providers
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   │   └── useAPI.ts            # API hooks
│   ├── lib/                     # Utilities & services
│   │   ├── prisma.ts            # Database client
│   │   ├── redis.ts             # Redis client & caching
│   │   ├── auth.ts              # JWT authentication service
│   │   ├── validations.ts       # Zod validation schemas
│   │   ├── api-utils.ts         # API utilities
│   │   └── api-client.ts        # Frontend API client
│   └── generated/               # Generated Prisma Client
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.js                  # Database seeding
├── public/                      # Static assets
└── tests/                       # Test files
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Chart.js** - Data visualization

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **Prisma 7** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Redis** - Caching layer
- **Zod** - Schema validation
- **JWT (jose)** - Authentication tokens
- **bcryptjs** - Password hashing

### DevOps
- **Vercel** - Deployment platform
- **GitHub Actions** - CI/CD
- **Prisma Studio** - Database GUI

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](./QUICK_START.md) | Get up and running in 5 minutes |
| [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) | Complete backend integration guide |
| [API_REFERENCE.md](./API_REFERENCE.md) | Full API endpoint documentation |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | Database structure and relationships |
| [DATABASE_QUICKSTART.md](./DATABASE_QUICKSTART.md) | Database setup guide |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Production deployment instructions |
| [MIGRATIONS_GUIDE.md](./MIGRATIONS_GUIDE.md) | Database migration workflow |

---

## 🎯 Key Features Deep Dive

### Authentication System

```typescript
// Login with hooks
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const { login, loading } = useAuth();
  
  const handleSubmit = async (e) => {
    await login(email, password);
    router.push('/dashboard');
  };
}
```

**Features:**
- JWT-based authentication
- HttpOnly cookie storage
- Role-based access control
- Secure password hashing

### API Integration

```typescript
// Fetch climate data
import { useLatestClimate } from '@/hooks/useAPI';

function Dashboard() {
  const { data, loading, error } = useLatestClimate('Mumbai');
  return <div>Temperature: {data?.temperature}°C</div>;
}
```

**Features:**
- Type-safe API calls
- Automatic caching (Redis)
- Error handling
- Loading states

### Data Validation

```typescript
// All inputs validated with Zod
import { createPostSchema } from '@/lib/validations';

const validated = createPostSchema.parse(input);
// Throws ZodError if invalid
```

**Features:**
- Request validation
- Type inference
- Custom error messages
- Schema composition

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Climate Data
- `GET /api/climate/latest?city=Mumbai` - Latest reading (cached 5min)
- `GET /api/climate/history?city=Delhi&hours=48` - Historical data (cached 30min)

### Environmental Alerts
- `GET /api/alerts/active?severity=HIGH` - Active alerts (cached 5min)

### Community
- `GET /api/community/groups?city=Mumbai` - List groups (cached 30min)
- `POST /api/community/groups` - Create group 🔒

### Posts
- `GET /api/posts?groupId=xxx` - List posts
- `POST /api/posts` - Create post 🔒

### Pledges
- `GET /api/pledges?status=ACTIVE` - List pledges 🔒
- `POST /api/pledges` - Create pledge 🔒

### Profile
- `GET /api/profile` - Get profile 🔒
- `PATCH /api/profile` - Update profile 🔒

### Supply Chain
- `GET /api/supply-chain` - List items 🔒
- `POST /api/supply-chain` - Create item 🔒

🔒 = Authentication required

**Full API documentation: [API_REFERENCE.md](./API_REFERENCE.md)**

---

## 🗄️ Database Schema

### Core Models
- **User** - Authentication and profiles
- **ClimateReading** - Temperature, humidity, AQI data
- **Alert** - Environmental warnings
- **CommunityGroup** - User groups
- **Post** - Community posts
- **Pledge** - Environmental commitments
- **SupplyChainItem** - Product tracking

**23 total models with 50+ fields**

**Full schema documentation: [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**

---

## 🚀 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
```

### Database
```bash
npm run db:push          # Push schema to database
npm run db:generate      # Generate Prisma Client
npm run db:seed          # Seed with sample data
npm run db:studio        # Open Prisma Studio GUI
npm run db:reset         # Reset database and reseed
npm run verify-db        # Verify database connection
```

### Testing
```bash
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
```

---

## 🌐 Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/climatrix"

# Redis
REDIS_URL="redis://localhost:6379"
# Or Upstash: redis://default:password@host:port

# Authentication
JWT_SECRET="your-super-secret-32-character-key"
JWT_EXPIRES_IN="7d"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Cache TTLs (optional)
CACHE_TTL_SHORT=300      # 5 minutes
CACHE_TTL_MEDIUM=1800    # 30 minutes
CACHE_TTL_LONG=3600      # 1 hour
```

---

## 📈 Performance

### Caching Strategy

| Data Type | TTL | Strategy |
|-----------|-----|----------|
| Climate readings | 5 min | Redis cache |
| Historical data | 30 min | Redis cache |
| User profiles | 1 hour | Redis cache |
| Static content | Forever | Next.js static |

### Database Optimization
- Indexed queries (city, timestamp)
- Connection pooling
- Selective field fetching
- Pagination on all list endpoints

### Response Times
- API routes: <100ms (cached)
- Database queries: <50ms
- Page loads: <200ms

---

## 🔒 Security Features

- ✅ JWT authentication with httpOnly cookies
- ✅ Password hashing with bcrypt
- ✅ Input validation with Zod
- ✅ SQL injection protection (Prisma)
- ✅ XSS prevention (React auto-escaping)
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Secure headers

---

## 🧪 Testing

### Login Test Account
```
Email: admin@climatrix.com
Password: Admin123
Role: ADMIN
```

### Test Cities
- Mumbai
- Delhi
- Bangalore
- Chennai
- Kolkata

### API Testing
```bash
# Test climate data
curl "http://localhost:3000/api/climate/latest?city=Mumbai"

# Test authentication
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"Test1234"}'
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Railway

1. Connect GitHub repository
2. Add PostgreSQL and Redis services
3. Set environment variables
4. Deploy automatically on push

### Docker

```bash
# Build image
docker build -t climatrix .

# Run container
docker run -p 3000:3000 --env-file .env climatrix
```

**Full deployment guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🆘 Troubleshooting

### Database Connection Failed
```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Redis Connection Failed
```bash
# Check if Redis is running
redis-cli ping  # Should return PONG

# Check REDIS_URL
echo $REDIS_URL
```

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**More troubleshooting: [QUICK_START.md#troubleshooting](./QUICK_START.md#troubleshooting)**

---

## 📞 Support

- 📖 [Documentation](./BACKEND_INTEGRATION.md)
- 🐛 [Report Issues](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Vercel for hosting platform
- Open source community

---

**Built with ❤️ for a sustainable future 🌍**

**[Get Started →](./QUICK_START.md)** | **[View API Docs →](./API_REFERENCE.md)** | **[Deploy →](./DEPLOYMENT_GUIDE.md)**
