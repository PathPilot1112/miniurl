A scalable, production-ready URL shortener built with Next.js App Router, MongoDB, and Redis, designed using real-world system design principles such as caching, rate limiting, and secure redirection.

Inspired by TinyURL & Bitly — built for learning system design + backend architecture.

🚀 Features

🔗 Generate short URLs instantly

⚡ Ultra-fast redirects using Redis caching

🛡 IP-based rate limiting (anti-spam)

🔐 Secure URL validation & sanitization

📈 Designed for high traffic (20k+ users)

🧠 Clean architecture with separation of concerns

🌐 SEO-friendly 302 redirects

🧠 System Design Highlights

Stateless APIs for scalability

Redis for caching & rate limiting

MongoDB as the source of truth

HTTP 302 redirects for flexibility

App Router (Next.js) for modern routing

Production-ready folder structure

🛠 Tech Stack
Layer	Technology
Frontend	Next.js (App Router)
Backend	Next.js API Routes
Database	MongoDB (Mongoose)
Cache & Rate Limit	Redis (Upstash)
Security	Input validation, CORS
Deployment	Vercel
📂 Folder Structure
src/
 ├── app/
 │   ├── page.tsx
 │   ├── api/
 │   │    └── shorten/
 │   │         └── route.ts
 │   └── [code]/
 │        └── route.ts
 ├── lib/
 │   ├── db.ts
 │   ├── redis.ts
 │   └── generateCode.ts
 ├── models/
 │   └── Url.ts

🔌 API Endpoints
1️⃣ Create Short URL
POST /api/shorten


Request Body

{
  "url": "https://example.com"
}


Response

{
  "shortUrl": "https://x.ly/abc123"
}

2️⃣ Redirect to Original URL
GET /abc123


➡️ Redirects using HTTP 302 to the original URL

🔑 Short Code Generation

Short URLs are generated using cryptographically secure random bytes:

crypto.randomBytes(4).toString("hex")


Low collision probability

URL-safe

Fast & scalable

🧠 Redis Usage
🔹 Rate Limiting

Max 10 requests / IP / minute

Prevents spam & abuse

rate:IP → request count (TTL: 60s)

🔹 Caching

Shortcode → Original URL

Reduces MongoDB load

Improves redirect latency

🔐 Security Measures

✅ URL format validation

✅ Block javascript: URLs

✅ Request size limits

✅ Input sanitization

✅ CORS restrictions

✅ Rate limiting (Redis)

⚙️ Environment Variables

Create a .env.local file:

MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_upstash_redis_url
BASE_URL=http://localhost:3000

▶️ Running Locally
git clone https://github.com/yourusername/xly-url-shortener
cd xly-url-shortener
npm install
npm run dev


Open:
👉 http://localhost:3000

🌍 Deployment

Frontend & API: Vercel

Redis: Upstash (Free Tier)

MongoDB: Atlas

Designed to scale horizontally with zero downtime.

📈 Scalability Notes

Redis caching reduces DB reads

Stateless APIs allow easy horizontal scaling

Short code indexing improves lookup time

Rate limiting protects infra under load

🎯 Learning Outcomes

System design fundamentals

Redis caching & rate limiting

Secure API development

Next.js App Router architecture

Production-grade folder structure

Real-world backend optimization

📌 Future Enhancements

📊 Admin analytics dashboard

🔐 User authentication

🔁 Custom aliases

⏳ URL expiry

🌍 Geo-analytics

📉 Click tracking

🧑‍💻 Author

Mahik Jain
Full-Stack Developer | System Design Learner

Built as a hands-on system design project to understand how real-world scalable services work.

⭐ If You Like This Project

Give it a ⭐ on GitHub — it helps others discover it!