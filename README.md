# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Testing -----


# ColumbiaCribs 🏠

ColumbiaCribs is a dorm & building review app for Columbia students.  
Students can:

- Browse buildings and see average ratings
- Verify with a Columbia email
- Submit detailed reviews + per-category ratings

This repo contains:

- **Frontend** – React + Vite (in the root folder)
- **Backend** – Express + PostgreSQL (in `server/`)
- **Database** – PostgreSQL (`columbia_cribs`)

---

## 1. Prerequisites

- **Node.js** ≥ 18
- **npm**
- **PostgreSQL** ≥ 14

---

## 2. Clone the project

```bash
git clone <REPO_URL>
cd ColumbiaCribs

3. Frontend Setup (React + Vite)

From the project root:

cd ColumbiaCribs   # if not already here
npm install

Run the dev server:

npm run dev

Vite will start at:

http://localhost:5173

Keep this terminal open.

4. Backend setup (Express + PostgreSQL)
4.1 Install backend dependencies
cd server
npm install

4.2 Configure environment variables

Create server/.env:

PORT=5000

PGHOST=localhost
PGUSER=postgres        # or your own username
PGPASSWORD=your_pass   # your Postgres password
PGDATABASE=columbia_cribs
PGPORT=5432

Do not commit .env.
.env and server/.env are ignored via .gitignore.

4.3 Create the database & tables

Open psql and run:

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

-- Seed initial buildings
INSERT INTO buildings (name, address, description) VALUES
  ('Broadway Hall', 'West 114th Street and Broadway', 'Upperclass dorm with suite-style living.'),
  ('Carman Hall', '114th Street between Broadway and Amsterdam', 'First-year residence hall.');

4.4 Run the backend

From ColumbiaCribs/server:

npm run dev


You should see:

API running on http://localhost:5000
[dotenv] injecting env ...

5. How the app works (flow)
Frontend routes

/ – Landing page + building list

/verify-email – “Almost there!” screen (enter Columbia email)

/enter-code – “Last Step!” screen (enter verification code)

/review – Submit Review screen

/success – Simple success screen (optional)

Backend API endpoints

GET /api/buildings
Returns all buildings with average rating + review count.

GET /api/buildings/:id
Returns a single building.

GET /api/buildings/:id/reviews
Returns reviews for a building.

POST /api/reviews
Creates a review. Body shape:

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


POST /api/send-code
Validates a @columbia.edu email, generates a 6-character code, stores it in email_codes, and logs it to the server console (for now we are not sending real emails).

POST /api/verify-code
Checks if the provided { email, code } exists in email_codes.
Response: { "success": true } or { "success": false }.

6. Local testing steps

Start backend

cd server
npm run dev


Start frontend

cd ..
npm run dev


In the browser, go to:
http://localhost:5173.

Click Review in the header → you should land on /verify-email.

Enter a Columbia email, e.g. abc123@columbia.edu, click Verify.

In the server terminal, you’ll see something like:

Verification code for abc123@columbia.edu: XNG42J


The app navigates to /enter-code?email=abc123@columbia.edu.

On /enter-code, enter the code from the server logs and click Verify.

If valid, you’ll be taken to /review.

Fill out the Submit Review form and submit.

Then, in psql:

SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5;


You should see your new review.

7. Project structure
ColumbiaCribs/
  public/
  src/
    components/
      Header.jsx / .css
      Home.jsx / .css
      VerifyEmail.jsx / .css
      EnterCode.jsx / .css
      ReviewPage.jsx / .css
      Success.jsx / .css
      Footer.jsx / .css
    App.jsx
    main.jsx
    index.css
  server/
    index.js
    package.json
    .env          # not committed
  package.json    # frontend
  vite.config.js
  netlify.toml
  README.md

8. Environment & security

.env and server/.env are gitignored.

If an .env was accidentally pushed before, credentials must be rotated (change DB password, etc.).

9. Scripts

From the root:

npm run dev      # start Vite frontend


From server/:

npm run dev      # start Express backend with nodemon
npm start        # start backend without nodemon

You said:
put all of them in one file markdown
ChatGPT said:

Here is ONE complete Markdown file containing everything — fully formatted and ready to paste directly into your README.md.

ColumbiaCribs 🏠

Dorm & building reviews for Columbia students.

3. Frontend Setup (React + Vite)

From the project root:

cd ColumbiaCribs   # if not already here
npm install


Run the dev server:

npm run dev


Vite will start at:

http://localhost:5173

Keep this terminal open.

4. Backend Setup (Express + PostgreSQL)
4.1 Install backend dependencies
cd server
npm install

4.2 Configure environment variables

Create server/.env:

PORT=5000

PGHOST=localhost
PGUSER=postgres        # or your own username
PGPASSWORD=your_pass   # your Postgres password
PGDATABASE=columbia_cribs
PGPORT=5432


⚠️ Do not commit .env.
.env and server/.env are ignored via .gitignore.

4.3 Create the database & tables

Open psql and run:

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

-- Seed initial buildings
INSERT INTO buildings (name, address, description) VALUES
  ('Broadway Hall', 'West 114th Street and Broadway', 'Upperclass dorm with suite-style living.'),
  ('Carman Hall', '114th Street between Broadway and Amsterdam', 'First-year residence hall.');

4.4 Run the backend

From ColumbiaCribs/server:

npm run dev


You should see:

API running on http://localhost:5000
[dotenv] injecting env ...

5. How the App Works (Flow)
Frontend Routes

/ – Landing page + building list

/verify-email – “Almost there!” screen (enter Columbia email)

/enter-code – “Last Step!” screen (enter verification code)

/review – Submit Review screen

/success – Simple success screen (optional)

Backend API Endpoints
GET /api/buildings

Returns all buildings with average rating + review count.

GET /api/buildings/:id

Returns a single building.

GET /api/buildings/:id/reviews

Returns reviews for a building.

POST /api/reviews

Creates a review.

Example request body:

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

POST /api/send-code

Validates a @columbia.edu email and saves a verification code in the database.
(For now, the code is printed to the server console instead of sending an email.)

POST /api/verify-code

Checks if { email, code } exists.
Returns:

{ "success": true }


or

{ "success": false }

6. Local Testing Steps
1. Start backend
cd server
npm run dev

2. Start frontend
cd ..
npm run dev


Open the browser:
➡️ http://localhost:5173

3. Test the flow

Click Review → you should land on /verify-email.

Enter a Columbia email, e.g.:

abc123@columbia.edu


The server terminal prints:

Verification code for abc123@columbia.edu: XNG42J


App navigates to:

/enter-code?email=abc123@columbia.edu


Enter the code shown in the backend terminal.

If correct → you are redirected to /review.

Submit a review.

Check the database:

SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5;


You should see your new review.

7. Project Structure
ColumbiaCribs/
  public/
  src/
    components/
      Header.jsx / .css
      Home.jsx / .css
      VerifyEmail.jsx / .css
      EnterCode.jsx / .css
      ReviewPage.jsx / .css
      Success.jsx / .css
      Footer.jsx / .css
    App.jsx
    main.jsx
    index.css
  server/
    index.js
    package.json
    .env          # not committed
  package.json    # frontend
  vite.config.js
  netlify.toml
  README.md

8. Environment & Security

.env and server/.env are gitignored.

If an .env was accidentally committed before, rotate all credentials (change DB password, etc.).

9. Scripts
From the project root:
npm run dev      # start Vite frontend

From server/:
npm run dev      # start Express backend with nodemon
npm start        # start backend without nodemon

