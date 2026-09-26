# Dental Patient Management: Frontend

**Live app:** https://dental-client-management-frontend.vercel.app
<img width="1460" height="722" alt="image" src="https://github.com/user-attachments/assets/21f2629e-7f9d-4108-8d31-bd09beaa3639" />
<img width="1467" height="731" alt="image" src="https://github.com/user-attachments/assets/859c5f7b-d1e5-4247-bfb6-7ebd34835f31" />
<img width="1451" height="728" alt="image" src="https://github.com/user-attachments/assets/6a79f113-fe42-4a07-83d9-ab553ca17948" />
<img width="457" height="563" alt="image" src="https://github.com/user-attachments/assets/c19febef-89e7-40cc-8b83-d50d2d1363df" />

## 1. Project overview

A web app for a dental clinic, built as a single-page React app on top of the [backend REST service](https://github.com/heykvr/dental-client-management-backend).

- **Dashboard:** stat cards, a registration trend chart (filter by year or month), recent patients.
- **Patients:** searchable, sortable, paginated list, with a floating "Add Patient" button that opens a popup form.
- **Patient profile:** details with edit, a case sheet (view, then edit and save; drafts allowed), an AI summary, and a chatbot.
- **Forms:** validated with React Hook Form + Zod; server errors are shown on the right field.
- **Loading and errors:** skeleton loaders, toasts, empty states, a 404 page, an error boundary, a "Waking up server…" banner, and a live countdown when rate limited.

**Structure:**

```
src/
├── pages/            # Dashboard, Patients, Patient profile, 404
├── features/         # patients, case-sheet, summary, chat, dashboard
├── components/       # reusable UI (Button, Input, Modal, …) and layout
├── hooks/            # data fetching and caching (React Query)
├── api/              # axios client and API calls
└── lib/              # helpers (dates in IST, formatting)
```

## 2. Technologies used

JavaScript · React · Vite · Tailwind CSS · TanStack Query · React Hook Form + Zod · Recharts · Vercel

## 3. Frontend setup

Requires Node.js 20.19+ (or 22+) and a running [backend](https://github.com/heykvr/dental-client-management-backend#readme).

```bash
git clone https://github.com/heykvr/dental-client-management-frontend.git
cd dental-client-management-frontend
cp .env.example .env      # replace the <placeholder> (see section 4)
npm install
```

Lint and format checks:

```bash
npm run lint
npm run format:check
```

## 4. Environment variables required

| Variable            | Example                                        |
| ------------------- | ---------------------------------------------- |
| `VITE_API_BASE_URL` | Your backend URL, e.g. `http://localhost:8001` |

Only `VITE_*` variables reach the browser, so no secrets go here. The AI key stays in the backend. In production this is set in Vercel's environment settings.

## 5. Steps to run the application locally

1. Start the backend (see its [README](https://github.com/heykvr/dental-client-management-backend#readme)).
2. Run:

   ```bash
   npm run dev
   ```

3. Open http://localhost:5173. The backend's `CORS_ORIGINS` must include this URL; it does by default.

Production build: `npm run build`, then `npm run preview`.

## 6. Assumptions and known limitations

**Assumptions**

- Used by clinic staff on desktop or mobile; there is no public sign-up.
- All dates and times are shown in IST.
- The form asks for date of birth; age is calculated from it.
- Chat history is kept in the browser for 30 minutes of inactivity, per patient.

**Known limitations**

- No login yet, so anyone with the link can use the app.
- Patient links use the patient ID (e.g. `/patients/PAT-0001`), which is easy to guess. With login, they should use random IDs.
- The backend runs on Render's free tier and sleeps when idle, so the first load can take 30–60 s (the app shows "Waking up server…").
- AI features use Gemini's free tier and can be briefly unavailable under load, so use demo data only.
