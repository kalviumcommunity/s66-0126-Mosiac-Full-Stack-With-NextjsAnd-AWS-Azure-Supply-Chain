# Climatrix Database Schema Documentation

## Overview
This PostgreSQL database schema is designed to support the Climatrix climate intelligence and supply chain monitoring platform. The schema is built using Prisma ORM and includes comprehensive data models for environmental monitoring, community engagement, and supply chain tracking.

---

## Database Structure

### 🔐 User Management & Authentication

#### **User**
Core user table with authentication and profile information.
- Unique identifiers: email, username
- Location data: city, state, country, coordinates (lat/long)
- Role-based access control (USER, ADMIN, MODERATOR, ANALYST)
- Tracks verification status and last login

#### **Session**
Manages user authentication sessions with token-based auth.

#### **Profile**
Extended user profile with social links and professional information.

---

### 🌍 Environmental Data Monitoring

#### **ClimateReading**
Stores comprehensive climate and weather data points:
- **Temperature**: current, feels-like, min/max
- **Air Quality**: AQI, PM2.5, PM10, CO, NO2, SO2, O3
- **Weather**: humidity, pressure, wind, rainfall, cloud cover
- **UV & Solar**: UV index, solar radiation
- Location-based with coordinates
- Time-series data with indexing for efficient queries

#### **AirGasComposition**
Tracks greenhouse gas concentrations:
- CO2 (carbon dioxide)
- CH4 (methane)
- N2O (nitrous oxide)
- O2 (oxygen)

#### **EnvironmentalAlert**
System-generated alerts for environmental conditions:
- Alert types: AIR_QUALITY, HEAT_WAVE, UV_WARNING, STORM, etc.
- Severity levels: LOW to EXTREME
- Geographic scope with radius
- Active/inactive status tracking

---

### 🔔 User Alerts & Notifications

#### **Alert**
User-configured personal alerts with custom thresholds.

#### **Notification**
User notification system for alerts, community updates, and system messages.
- Read/unread tracking
- Flexible metadata storage

---

### 👥 Community & Social Features

#### **Group**
Community groups organized by location or interest:
- Categories: air-quality, waste-management, energy, etc.
- Public/private visibility
- Location-based (city, state, country)
- Member management

#### **GroupMember**
Junction table managing group memberships with roles (ADMIN, MODERATOR, MEMBER).

#### **Post**
Community posts within groups:
- Rich content with images
- Tagging system
- Engagement metrics (likes, views)
- Pinning capability

#### **Comment**
Comments on posts with engagement tracking.

#### **EnvironmentalPledge**
User commitments to environmental actions:
- Pledge types: PLANT_TREES, REDUCE_DRIVING, SAVE_ENERGY, etc.
- Quantity tracking with units
- Status: ACTIVE, COMPLETED, VERIFIED, CANCELLED
- Verification system

---

### 📦 Supply Chain Monitoring

#### **SupplyChainItem**
Tracks products through the supply chain:
- **Environmental metrics**: carbon footprint, energy used, water used, waste
- **Real-time conditions**: temperature, humidity
- **Status tracking**: PENDING, IN_TRANSIT, ARRIVED, DELAYED, DELIVERED
- Origin, current location, and destination
- Estimated vs actual arrival times

#### **SupplyChainEvent**
Timeline of events for each supply chain item:
- Event types: departure, arrival, checkpoint, delay
- Location with coordinates
- Timestamp tracking

#### **SupplyChainAlert**
Alerts for supply chain issues:
- Temperature violations
- Delays
- Environmental concerns
- Resolution tracking

---

### 📊 Data Management & Analytics

#### **Favorite**
User favorites (locations, groups, posts).

#### **DataSubscription**
User subscriptions to specific data feeds:
- Data types: climate, AQI, UV, temperature
- Frequency: realtime, hourly, daily, weekly
- Location-specific

#### **SystemSettings**
Application-wide configuration key-value store.

#### **AuditLog**
Comprehensive audit trail for security and compliance:
- User actions
- Entity changes
- IP address and user agent tracking

---

## Key Features

### 1. **Time-Series Data**
Optimized indexes on `readingTime` for climate and air quality data enabling efficient time-range queries.

### 2. **Geospatial Queries**
Location-based indexing (latitude/longitude) supports:
- Nearby location searches
- Regional data aggregation
- Alert radius calculations

### 3. **Multi-tenancy Support**
User-scoped data with proper foreign key relationships and cascade deletions.

### 4. **Scalability**
- Strategic indexing on frequently queried fields
- JSON columns for flexible metadata storage
- Efficient cascade operations

### 5. **Data Integrity**
- Unique constraints on critical fields
- Enum types for consistent categorical data
- Proper foreign key relationships with cascade behavior

---

## Database Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Copy `.env.example` to `.env` and update with your PostgreSQL connection:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 5. (Optional) Seed Database
```bash
npx prisma db seed
```

### 6. View Database in Prisma Studio
```bash
npx prisma studio
```

---

## Common Queries

### Get Latest Climate Data for a City
```typescript
const latestReading = await prisma.climateReading.findFirst({
  where: { city: 'Delhi' },
  orderBy: { readingTime: 'desc' }
});
```

### Get Active Alerts for a User
```typescript
const userAlerts = await prisma.alert.findMany({
  where: {
    userId: userId,
    isActive: true
  },
  include: { user: true }
});
```

### Get Group Members with User Info
```typescript
const members = await prisma.groupMember.findMany({
  where: { groupId: groupId },
  include: {
    user: {
      select: {
        id: true,
        username: true,
        avatar: true
      }
    }
  }
});
```

### Track Supply Chain Item Journey
```typescript
const itemJourney = await prisma.supplyChainItem.findUnique({
  where: { id: itemId },
  include: {
    events: {
      orderBy: { timestamp: 'asc' }
    },
    alerts: {
      where: { isResolved: false }
    }
  }
});
```

---

## Indexes & Performance

Key indexes for optimal query performance:
- User lookups: `email`, `role`
- Climate data: `location + readingTime`, `city + readingTime`, `coordinates`
- Alerts: `alertType + isActive`, `city + isActive`
- Community: `groupId + createdAt`, `userId`
- Supply chain: `userId`, `status`, `productCode`
- Time-based: `createdAt`, `readingTime`, `timestamp`

---

## Security Considerations

1. **Password Hashing**: Always hash passwords before storing (use bcrypt or argon2)
2. **Session Management**: Token-based with expiration
3. **Audit Logging**: All critical actions logged
4. **Role-Based Access**: Use UserRole enum for authorization
5. **Data Privacy**: Cascade deletes ensure user data removal

---

## Migration Strategy

### AWS RDS PostgreSQL
```bash
# Set DATABASE_URL to AWS RDS endpoint
npx prisma migrate deploy
```

### Azure Database for PostgreSQL
```bash
# Add sslmode=require to connection string
DATABASE_URL="postgresql://...?sslmode=require"
npx prisma migrate deploy
```

### Supabase
```bash
# Use Supabase connection string with pooling
npx prisma migrate deploy
```

---

## Schema Versioning

- All changes tracked through Prisma migrations in `prisma/migrations/`
- Use descriptive migration names
- Test migrations in development before production deployment

---

## Support & Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Schema Visualization](http://prisma-erd.simonknott.de/) - Paste schema to visualize

---

*Schema Version: 1.0.0*  
*Last Updated: February 11, 2026*
