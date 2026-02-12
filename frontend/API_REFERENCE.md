# 📖 API Reference - Climatrix Backend

Quick reference for all API endpoints, request/response schemas, and authentication.

---

## Base URL

```
http://localhost:3000/api
```

---

## 🔐 Authentication

All authenticated endpoints require a JWT token stored in an httpOnly cookie. The cookie is automatically set on login/signup.

### Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePass123",
  "city": "Mumbai",
  "role": "USER"  // Optional: USER | ADMIN | MODERATOR
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "clwxxx...",
      "email": "user@example.com",
      "username": "johndoe",
      "role": "USER",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clwxxx...",
      "email": "user@example.com",
      "username": "johndoe",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Get Current User

```http
GET /api/auth/me
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clwxxx...",
    "email": "user@example.com",
    "username": "johndoe",
    "city": "Mumbai",
    "role": "USER",
    "bio": null,
    "avatar": null,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Logout

```http
POST /api/auth/logout
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🌡️ Climate Data

### Get Latest Reading

```http
GET /api/climate/latest?city=Mumbai
```

**Query Parameters:**
- `city` (string, required) - City name

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clwxxx...",
    "city": "Mumbai",
    "temperature": 28.5,
    "temperatureUnit": "CELSIUS",
    "weatherCondition": "CLOUDY",
    "humidity": 75,
    "rainfall": 0,
    "aqi": 150,
    "pm25": 65,
    "pm10": 120,
    "co2": 420,
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

**Cache:** 5 minutes

### Get Historical Data

```http
GET /api/climate/history?city=Delhi&hours=48&page=1&limit=20
```

**Query Parameters:**
- `city` (string, required) - City name
- `hours` (number, optional) - Hours to look back (default: 24)
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clwxxx...",
      "city": "Delhi",
      "temperature": 25.0,
      "humidity": 60,
      "aqi": 180,
      "timestamp": "2024-01-15T09:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 48,
    "totalPages": 3
  }
}
```

**Cache:** 30 minutes

---

## ⚠️ Alerts

### Get Active Alerts

```http
GET /api/alerts/active?city=Delhi&severity=HIGH&page=1&limit=10
```

**Query Parameters:**
- `city` (string, optional) - Filter by city
- `severity` (string, optional) - LOW | MEDIUM | HIGH | CRITICAL
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clwxxx...",
      "type": "AIR_QUALITY",
      "severity": "HIGH",
      "title": "High Air Pollution Alert",
      "description": "AQI levels exceeded 200 in Delhi NCR",
      "city": "Delhi",
      "isActive": true,
      "createdAt": "2024-01-15T08:30:00Z",
      "expiresAt": "2024-01-15T20:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

**Cache:** 5 minutes

---

## 👥 Community Groups

### List Groups

```http
GET /api/community/groups?city=Mumbai&page=1&limit=10
```

**Query Parameters:**
- `city` (string, optional) - Filter by city
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clwxxx...",
      "name": "Mumbai Climate Action",
      "description": "Community fighting climate change",
      "city": "Mumbai",
      "memberCount": 150,
      "createdAt": "2024-01-10T12:00:00Z",
      "creator": {
        "id": "clwxxx...",
        "username": "johndoe"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

**Cache:** 30 minutes

### Create Group

**Authentication Required** 🔒

```http
POST /api/community/groups
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "name": "Delhi Clean Air Initiative",
  "description": "Join us to reduce air pollution",
  "city": "Delhi"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Group created successfully",
  "data": {
    "id": "clwxxx...",
    "name": "Delhi Clean Air Initiative",
    "description": "Join us to reduce air pollution",
    "city": "Delhi",
    "memberCount": 1,
    "creatorId": "clwxxx...",
    "createdAt": "2024-01-15T11:00:00Z"
  }
}
```

---

## 📝 Posts

### List Posts

```http
GET /api/posts?groupId=clwxxx&page=1&limit=20
```

**Query Parameters:**
- `groupId` (string, optional) - Filter by group
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clwxxx...",
      "title": "Great cleanup drive today!",
      "content": "We collected 50kg of plastic waste",
      "createdAt": "2024-01-15T09:30:00Z",
      "author": {
        "id": "clwxxx...",
        "username": "johndoe"
      },
      "group": {
        "id": "clwxxx...",
        "name": "Mumbai Climate Action"
      },
      "_count": {
        "comments": 5,
        "reactions": 12
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
```

### Create Post

**Authentication Required** 🔒

```http
POST /api/posts
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "title": "Let's organize Beach Cleanup",
  "content": "This Sunday at Juhu Beach. Join us!",
  "groupId": "clwxxx..."  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": "clwxxx...",
    "title": "Let's organize Beach Cleanup",
    "content": "This Sunday at Juhu Beach. Join us!",
    "authorId": "clwxxx...",
    "groupId": "clwxxx...",
    "createdAt": "2024-01-15T11:15:00Z"
  }
}
```

---

## 🤝 Pledges

### List User Pledges

**Authentication Required** 🔒

```http
GET /api/pledges?status=ACTIVE
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Query Parameters:**
- `status` (string, optional) - ACTIVE | COMPLETED | CANCELLED

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clwxxx...",
      "title": "Reduce plastic usage",
      "description": "No single-use plastics for 30 days",
      "category": "WASTE_REDUCTION",
      "impact": 50,
      "status": "ACTIVE",
      "startDate": "2024-01-01T00:00:00Z",
      "targetDate": "2024-01-31T00:00:00Z",
      "progress": 75,
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### Create Pledge

**Authentication Required** 🔒

```http
POST /api/pledges
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "title": "Plant 10 trees",
  "description": "Contribute to reforestation",
  "category": "REFORESTATION",
  "impact": 100,
  "targetDate": "2024-03-01T00:00:00Z"
}
```

**Categories:**
- `CARBON_REDUCTION`
- `ENERGY_EFFICIENCY`
- `RENEWABLE_ENERGY`
- `WASTE_REDUCTION`
- `WATER_CONSERVATION`
- `SUSTAINABLE_TRANSPORT`
- `REFORESTATION`
- `COMMUNITY_ACTION`

**Response:**
```json
{
  "success": true,
  "message": "Pledge created successfully",
  "data": {
    "id": "clwxxx...",
    "title": "Plant 10 trees",
    "category": "REFORESTATION",
    "impact": 100,
    "status": "ACTIVE",
    "progress": 0,
    "startDate": "2024-01-15T00:00:00Z",
    "createdAt": "2024-01-15T11:20:00Z"
  }
}
```

---

## 👤 User Profile

### Get Profile

**Authentication Required** 🔒

```http
GET /api/profile
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clwxxx...",
    "email": "user@example.com",
    "username": "johndoe",
    "city": "Mumbai",
    "bio": "Climate activist and developer",
    "avatar": "https://...",
    "role": "USER",
    "createdAt": "2024-01-10T10:00:00Z",
    "_count": {
      "posts": 12,
      "pledges": 5,
      "groups": 3
    }
  }
}
```

### Update Profile

**Authentication Required** 🔒

```http
PATCH /api/profile
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "username": "johndoe_updated",
  "bio": "Passionate about sustainability",
  "city": "Delhi",
  "avatar": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "clwxxx...",
    "username": "johndoe_updated",
    "bio": "Passionate about sustainability",
    "city": "Delhi",
    "updatedAt": "2024-01-15T11:25:00Z"
  }
}
```

---

## 📦 Supply Chain

### List Supply Chain Items

**Authentication Required** 🔒

```http
GET /api/supply-chain?status=ACTIVE&page=1&limit=20
Cookie: token=eyJhbGciOiJIUzI1NiIs...
```

**Query Parameters:**
- `status` (string, optional) - ACTIVE | DELAYED | DELIVERED | CANCELLED
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clwxxx...",
      "code": "SC-1705318400000-ABCD",
      "name": "Solar Panels Shipment",
      "description": "100 solar panels for installation",
      "category": "ENERGY",
      "quantity": 100,
      "unit": "units",
      "origin": "China",
      "destination": "Mumbai",
      "currentLocation": "In Transit - Delhi",
      "status": "ACTIVE",
      "carbonFootprint": 500.5,
      "estimatedDelivery": "2024-01-20T00:00:00Z",
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 8,
    "totalPages": 1
  }
}
```

### Create Supply Chain Item

**Authentication Required** 🔒

```http
POST /api/supply-chain
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIs...

{
  "name": "Wind Turbine Components",
  "description": "Parts for renewable energy project",
  "category": "ENERGY",
  "quantity": 50,
  "unit": "parts",
  "origin": "Germany",
  "destination": "India",
  "currentLocation": "Hamburg Port",
  "carbonFootprint": 1200.0,
  "estimatedDelivery": "2024-02-01T00:00:00Z"
}
```

**Categories:**
- `RAW_MATERIAL`
- `COMPONENT`
- `FINISHED_GOOD`
- `ENERGY`
- `WASTE`
- `RECYCLED`

**Response:**
```json
{
  "success": true,
  "message": "Supply chain item created",
  "data": {
    "id": "clwxxx...",
    "code": "SC-1705318500000-WXYZ",
    "name": "Wind Turbine Components",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T11:30:00Z"
  }
}
```

---

## 📋 Common Response Formats

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Pagination Metadata

All paginated endpoints include:

```json
{
  "meta": {
    "page": 1,           // Current page
    "limit": 20,         // Items per page
    "total": 100,        // Total items
    "totalPages": 5      // Total pages
  }
}
```

---

## 🔑 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input/validation error |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |

---

## 🎯 Validation Rules

### User Registration
- Email: Valid email format
- Username: 3-30 characters, alphanumeric + underscore
- Password: Min 6 characters
- City: Optional string

### Climate Reading
- City: Required string
- Temperature: Number, -50 to 60
- Humidity: 0-100
- AQI: 0-500

### Posts
- Title: 5-200 characters
- Content: Min 10 characters
- GroupId: Valid CUID (optional)

### Pledges
- Title: 3-100 characters
- Impact: Number 1-100
- Category: Valid enum value

---

## 🚀 Rate Limiting

| Endpoint Type | Requests | Window |
|---------------|----------|--------|
| Auth | 10 | 15 minutes |
| Read | 100 | 1 minute |
| Write | 20 | 1 minute |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705318800
```

---

## 🔧 Filtering & Sorting

### Query Parameters

**Filtering:**
```http
GET /api/posts?groupId=xxx&userId=yyy
```

**Pagination:**
```http
GET /api/posts?page=2&limit=50
```

**Date Ranges:**
```http
GET /api/climate/history?hours=48
```

---

## 💡 Best Practices

1. **Always handle errors** - Check `success` field
2. **Use pagination** - Don't fetch all data at once
3. **Cache responses** - Especially for read-heavy endpoints
4. **Validate inputs** - Client-side validation first
5. **Store tokens securely** - Use httpOnly cookies
6. **Handle 401 errors** - Redirect to login
7. **Use TypeScript types** - Import from `@/lib/validations`

---

## 🧪 Testing Examples

### Using fetch

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
  credentials: 'include'  // Important for cookies!
});

const data = await response.json();
if (data.success) {
  console.log('Logged in:', data.data.user);
}
```

### Using API Client

```typescript
import { apiClient } from '@/lib/api-client';

// Get climate data
const climate = await apiClient.getLatestClimate('Mumbai');

// Create post
const post = await apiClient.createPost({
  title: 'New Post',
  content: 'Content here'
});
```

### Using Custom Hooks

```typescript
import { useLatestClimate } from '@/hooks/useAPI';

function Component() {
  const { data, loading, error, refetch } = useLatestClimate('Delhi');
  
  return <div>{data?.temperature}°C</div>;
}
```

---

## 📞 Support

For issues or questions:
- Check [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for integration guide
- Review [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for database structure
- See validation schemas in `src/lib/validations.ts`

---

**Last Updated:** 2024-01-15
**API Version:** 1.0.0
