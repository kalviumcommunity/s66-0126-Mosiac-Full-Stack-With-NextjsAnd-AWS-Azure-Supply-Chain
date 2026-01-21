# Climatrix — Rendering Strategy Overview

Climatrix is a climate intelligence dashboard designed to help citizens understand complex environmental data through clear visualizations and actionable insights. Since different parts of the application have different data freshness and performance requirements, we use Static Rendering (SSG), Dynamic Rendering (SSR), and Hybrid Rendering (ISR) strategically to optimize speed, scalability, and accuracy.

---

## Rendering Modes Used in Climatrix

### 1. Static Rendering (SSG)

Pages using SSG:
- Home Page
- About Page
- FAQ / Awareness Page

Why Static Rendering was chosen:  
These pages contain informational and educational content that does not change frequently. Rendering them at build time ensures extremely fast load times, better SEO, and zero server cost per request.

Implementation:
```js
export const revalidate = false;
```

Impact on Performance & UX:
- Lightning-fast page loads
- Served directly from CDN
- Ideal for first-time visitors and public access

---

### 2. Dynamic Rendering (SSR)

Pages using SSR:
- User Dashboard
- Real-time Air Quality (AQI) Page
- User Profile (location-based data)

Why Dynamic Rendering was chosen:  
Climate data such as air quality and pollution levels can change hourly and directly affect health decisions. These pages must always show the most up-to-date information.

Implementation:
```js
export const dynamic = 'force-dynamic';

const data = await fetch(API_URL, { cache: 'no-store' });
```

Impact on Performance & UX:
- Always fresh and accurate data
- Slightly higher server cost
- Essential for real-time decision-making

---

### 3. Hybrid Rendering (ISR – Incremental Static Regeneration)

Pages using ISR:
- City Climate Overview
- Weekly Temperature Trends
- Pollution History Pages

Why Hybrid Rendering was chosen:  
These pages receive high traffic but do not require real-time updates every second. ISR allows pages to remain fast while updating periodically.

Implementation:
```js
export const revalidate = 3600; // revalidate every 1 hour
```

Impact on Performance & UX:
- Fast like static pages
- Automatically updated data
- Reduced server load with good freshness balance

---

## Summary Table

| Page Type        | Rendering Mode | Reason                            |
|------------------|----------------|-----------------------------------|
| Home / About     | SSG            | Static content, SEO-focused       |
| Dashboard        | SSR            | Live, real-time climate data      |
| City Overview    | ISR            | Periodic updates, high traffic    |

---

## Performance & Scalability Benefits

- SSG reduces Time-To-First-Byte (TTFB) and improves SEO  
- SSR ensures data accuracy for critical climate insights  
- ISR balances scalability and freshness, reducing server costs

---

## Reflection: Scaling to 10x Users

If Climatrix scaled to 10x more users, using SSR for all pages would significantly increase server load and cost. To handle scale efficiently, we would shift more pages to Static Rendering or ISR, caching commonly accessed climate summaries while reserving SSR only for pages that truly require real-time data. This approach improves scalability, reduces infrastructure cost, and maintains a fast user experience.

---

## Conclusion

By combining Static, Dynamic, and Hybrid rendering strategies, Climatrix leverages Next.js App Router effectively to deliver a performant, scalable, and real-world-ready application. Choosing the correct rendering strategy for each page ensures optimal speed, cost efficiency, and data reliability.

