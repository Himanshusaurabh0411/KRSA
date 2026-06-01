# Krishna Rattan Sports Academy Platform
# Wazirabad,New Delhi

Production-oriented monorepo for KRSA: a Khelo India/SAI aligned public website, athlete portals, admissions, tournament/news/gallery management, SAI reporting, schedules, performance, payments, and an Express/MongoDB backend.

## Architecture

- `apps/web`: Next.js App Router, Tailwind CSS, Framer Motion, responsive dark/light UI.
- `apps/api`: Node.js, Express, MongoDB/Mongoose, JWT auth, RBAC, Razorpay order + webhook support, email notifications.
- Database: MongoDB Atlas with role-based `User`, `Student`, `Coach`, `Program`, `Batch`, `Admission`, `Attendance`, `Payment`, `PerformanceReport`, `Injury`, `Announcement`, and `ChatThread` models.
- Deployment: Vercel for web, Render/Railway for API, MongoDB Atlas for data.

## Folder Structure

```txt
apps/
  web/
    src/app/                 Next.js pages
    src/components/          Reusable UI
    src/lib/                 Product data and helpers
  api/
    src/config/              Env and database setup
    src/controllers/         Request handlers
    src/middleware/          Auth, errors, uploads
    src/models/              Mongoose schemas
    src/routes/              REST routes
    src/services/            Email, AI, payments
    src/server.ts            API entrypoint
```

## API Routes

Authentication:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Admissions:
- `POST /api/admissions`
- `GET /api/admissions`
- `PATCH /api/admissions/:id/status`

Academy operations:
- `GET /api/sports`, `POST /api/sports`
- `GET /api/athletes`, `POST /api/athletes`, `PATCH /api/athletes/:id/archive`
- `POST /api/athletes/:id/achievements`
- `GET /api/applications`, `POST /api/applications`, `PATCH /api/applications/:id/status`
- `GET /api/tournaments`, `POST /api/tournaments`
- `GET /api/news`, `POST /api/news`
- `GET /api/gallery`, `POST /api/gallery`
- `GET /api/sai/documents`, `POST /api/sai/documents`
- `GET /api/sai/export/nsrs`
- `GET /api/programs`, `POST /api/programs`
- `GET /api/batches`, `POST /api/batches`
- `GET /api/attendance`, `POST /api/attendance`
- `GET /api/performance`, `POST /api/performance`
- `GET /api/injuries`, `POST /api/injuries`
- `GET /api/announcements`, `POST /api/announcements`
- `GET /api/chat/threads`, `POST /api/chat/threads`, `POST /api/chat/threads/:id/messages`

Payments:
- `GET /api/payments`
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
- `POST /api/payments/webhook`

Analytics:
- `GET /api/analytics/admin`
- `GET /api/analytics/student`
- `GET /api/analytics/coach`

## Local Setup

```bash
npm install
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
npm run dev:api
npm run dev:web
```

The web app runs on `http://localhost:3000`; the API runs on `http://localhost:4000`.

## Deployment

1. Create a MongoDB Atlas cluster and set `MONGODB_URI`.
2. Deploy `apps/api` to Render or Railway.
   - Build command: `npm install && npm run build --workspace=@krsa/api`
   - Start command: `npm run start --workspace=@krsa/api`
   - Add all backend env vars from `.env.example`.
3. Deploy `apps/web` to Vercel.
   - Root directory: `apps/web`
   - Add `NEXT_PUBLIC_API_URL=https://your-api-domain.com/api`
   - Add `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
   - Add admin OTP env vars:
     - `ADMIN_EMAILS=admin1@example.com,admin2@example.com`
     - `ADMIN_PASSWORD_HASH=<salt:scrypt-hash>`
     - `ADMIN_OTP_SECRET=<strong-random-secret>`
     - `RESEND_API_KEY=<resend-api-key>`
     - `ADMIN_OTP_FROM="KRSA Admin <admin@your-domain.com>"`
   - Optional public social links:
     - `NEXT_PUBLIC_KRSA_WHATSAPP_URL=https://wa.me/<number>`
     - `NEXT_PUBLIC_KRSA_INSTAGRAM_URL=https://instagram.com/<handle>`
4. Add the Razorpay webhook URL: `https://your-api-domain.com/api/payments/webhook`.

## Production Notes

- Use a strong `JWT_SECRET`, Atlas IP access rules, and HTTPS-only frontend/backend URLs.
- Keep `ADMIN_OTP_TEST_MODE=false` in production. The admin portal at `/admin` requires an allowlisted email and password, with OTP available as a fallback when email delivery is configured.
- Store uploaded documents in S3/Cloudinary in production; the local multer disk adapter is intentionally replaceable.
- Keep Razorpay webhook verification enabled and never trust client-side payment status alone.
- Add observability with Sentry/Logtail and API rate limits per route before public launch.
