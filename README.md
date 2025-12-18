# ColumbiaCribs 🏠

https://cucribs.netlify.app/

ColumbiaCribs is a dorm & building review app for Columbia students.

Students can:
- Browse buildings and see average ratings
- Verify with a Columbia email
- Submit detailed reviews + per-category ratings

Repo layout:
- **Frontend** (React + Vite): project root
- **Backend** (Express): `server/`
- **Database** (PostgreSQL): `columbia_cribs`

---

## Prerequisites

- Node.js >= 18
- npm
- PostgreSQL >= 14 (includes `psql`)

### Install PostgreSQL / psql

**macOS (Homebrew):**
```bash
# Install Homebrew (if needed):
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew install postgresql@16
brew services start postgresql@16
psql --version
```

**Windows (PostgreSQL Installer + PATH):**
1) Install PostgreSQL using the official Windows installer.  
2) Open PowerShell and run:
```powershell
psql --version
```
If `psql` is not recognized, add it to PATH (adjust `16` to your installed version), then reopen PowerShell:
```powershell
setx PATH "$env:PATH;C:\Program Files\PostgreSQL\16\bin"
psql --version
```

---

## Tools / Libraries

Tech stack:
- React + Vite (frontend)
- Express + Node (backend)
- PostgreSQL (database)
- Netlify (deployment)

Notable packages:
- react-select
- react-icons

---

## Clone

```bash
git clone https://github.com/noob339/ColumbiaCribs.git
cd ColumbiaCribs
```

---

## Setup + Run locally (Backend + Frontend)

You need **two terminals**.

### Terminal 1 — Backend (Express)

From the project root:

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=your_pass
PGDATABASE=columbia_cribs
PGPORT=5432
```

> Notes:
> - `PGUSER` is your local Postgres role (often your mac username), not always `postgres`.
> - Never commit `.env`.

Create the database + tables (open `psql` and run):

```sql
-- Create DB
CREATE DATABASE columbia_cribs;
\c columbia_cribs;

-- Buildings table
CREATE TABLE buildings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  building_id INTEGER NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  pros TEXT,
  cons TEXT,
  overall_review TEXT NOT NULL,
  overall_rating INTEGER,
  social_life_rating INTEGER,
  comfort_rating INTEGER,
  safety_rating INTEGER,
  distance_rating INTEGER,
  amenities_rating INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Email verification codes
CREATE TABLE email_codes (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed initial buildings (run once)
INSERT INTO buildings (name, address, description) VALUES
  ('Broadway Hall', 'West 114th Street and Broadway', 'Upperclass dorm with suite-style living.'),
  ('Carman Hall', '114th Street between Broadway and Amsterdam', 'First-year residence hall.');
```

Start the backend:

```bash
npm run dev
```

Backend runs at:
- http://localhost:5000

---

### Terminal 2 — Frontend (React + Vite)

From the project root:

```bash
npm install
npm run dev
```

Frontend runs at:
- http://localhost:5173

---

## API / Frontend connection note

The frontend expects API endpoints under `/api/...`.

If your frontend is calling `/api` directly, you should have **either**:
- a **Vite dev proxy** routing `/api` → `http://localhost:5000`, **or**
- backend **CORS enabled** and frontend calling `http://localhost:5000/api/...`.

(If you hit CORS errors, check `vite.config.js` proxy or backend CORS settings.)

---

## App flow

Frontend routes:
- `/` – Landing page + building list
- `/verify-email` – Enter Columbia email
- `/enter-code` – Enter verification code
- `/review` – Submit review
- `/success` – Optional success screen

Backend endpoints:
- `GET /api/buildings` — all buildings with average rating + review count
- `GET /api/buildings/:id` — single building
- `GET /api/buildings/:id/reviews` — reviews for a building
- `POST /api/reviews` — create a review
- `POST /api/send-code` — validate `@columbia.edu`, generate code, store in DB, print code to server console (no real email yet)
- `POST /api/verify-code` — verify `{ email, code }` in DB → `{ "success": true/false }`

Example request body for `POST /api/reviews`:

```json
{
  "buildingId": 1,
  "title": "Quiet but convenient upperclass dorm",
  "pros": "Quiet floors, big windows",
  "cons": "Small kitchens, slow elevators",
  "overallReview": "Full text...",
  "ratings": {
    "overall": 4,
    "socialLife": 3,
    "comfort": 4,
    "safety": 5,
    "distance": 4,
    "amenities": 3
  }
}
```

---

## Quick local test

1) Start backend:
```bash
cd server
npm run dev
```

2) Start frontend (new terminal, from project root):
```bash
npm run dev
```

3) Open: http://localhost:5173  
4) Click **Review** → enter `abc123@columbia.edu`  
5) Copy the code printed in the backend terminal, paste it on `/enter-code`  
6) Submit a review  
7) Confirm it saved (in `psql`):

```sql
SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5;
```

## Security note

- `server/.env` must be gitignored.
- If credentials were ever committed, rotate them.

---

## Scripts

From root:
- `npm run dev` — start Vite frontend

From `server/`:
- `npm run dev` — start Express backend with nodemon
- `npm start` — start backend without nodemon
