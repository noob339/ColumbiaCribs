# ColumbiaCribs 🏠

https://cucribs.netlify.app/

ColumbiaCribs is a dorm & building review app for Columbia students.

Students can:

-   Browse buildings and see average ratings
-   Verify with a Columbia email
-   Submit detailed reviews + per-category ratings

Repo layout:

-   **Frontend** (React + Vite): project root
-   **Backend** (Express): `server/`
-   **Database** (PostgreSQL): `columbia_cribs`

---

## Prerequisites

-   Node.js >= 18
-   npm
-   PostgreSQL >= 14 (includes `psql`)

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

1. Install PostgreSQL using the official Windows installer.
2. Open PowerShell and run:

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

-   React + Vite (frontend)
-   Express + Node (backend)
-   PostgreSQL (database)
-   Netlify (deployment)

Notable packages:

-   react-select
-   react-icons
-   react-router-dom

For these packages please install using

npm install <name of package>

---

## Clone

```bash
git clone https://github.com/noob339/ColumbiaCribs.git
cd ColumbiaCribs

We believe the repo is private, if access is needed please let us know but the zip files should work, that said you can also visit at cucribs.netlify.app
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
>
> -   `PGUSER` is your local Postgres role (often your mac username), not always `postgres`.
> -   Never commit `.env`.

---

## Postgres role/user setup (important)

If you get errors like **"role does not exist"** or **"password authentication failed"**, your `PGUSER` / role is the issue.

### 1) Check your existing Postgres roles

```bash
psql -d postgres
\du
```

### 2) If needed, create a dedicated local user (recommended)

In `psql`, run:

```sql
CREATE ROLE columbia_user WITH LOGIN PASSWORD 'your_pass';
ALTER ROLE columbia_user CREATEDB;
```

Then update `server/.env` to:

```env
PGUSER=columbia_user
PGPASSWORD=your_pass
```

### 3) Connect explicitly

```bash
psql -h localhost -U columbia_user -d postgres
```

---

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

-   http://localhost:5000

---

### Terminal 2 — Frontend (React + Vite)

From the project root:

```bash
npm install
npm run dev
```

Frontend runs at:

-   http://localhost:5173

---

## Quick local test

1. Start backend:

```bash
cd server
npm run dev
```

2. Start frontend (new terminal, from project root):

```bash
npm run dev
```

3. Open: http://localhost:5173
4. Click **Review** → enter `abc123@columbia.edu`
5. Copy the code printed in the backend terminal, paste it on `/enter-code`
6. Submit a review
7. Confirm it saved (in `psql`):

```sql
SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5;
```

## Warning!

-   `server/.env` must be gitignored.

---

## Scripts

From root:

-   `npm run dev` — start Vite frontend

From `server/`:

-   `npm run dev` — start Express backend with nodemon
-   `npm start` — start backend without nodemon
