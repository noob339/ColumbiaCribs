// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();

// Postgres connection
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("ColumbiaCribs API is running");
});

////////////////////////////
// BUILDINGS ENDPOINTS    //
////////////////////////////

// List buildings (for homepage)
app.get("/api/buildings", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*,
        COALESCE(AVG(r.overall_rating), 0) AS avg_overall_rating,
        COUNT(r.id) AS review_count
       FROM buildings b
       LEFT JOIN reviews r ON r.building_id = b.id
       GROUP BY b.id
       ORDER BY b.name`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching buildings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Optional: single building details
app.get("/api/buildings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const building = await pool.query("SELECT * FROM buildings WHERE id = $1", [
      id,
    ]);
    if (building.rowCount === 0) {
      return res.status(404).json({ error: "Building not found" });
    }
    res.json(building.rows[0]);
  } catch (err) {
    console.error("Error fetching building:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

////////////////////////////
// REVIEWS ENDPOINTS      //
////////////////////////////

// Create review
app.post("/api/reviews", async (req, res) => {
  try {
    const { buildingId, title, pros, cons, overallReview, ratings } = req.body;

    const result = await pool.query(
      `INSERT INTO reviews (
        building_id,
        title,
        pros,
        cons,
        overall_review,
        overall_rating,
        social_life_rating,
        comfort_rating,
        safety_rating,
        distance_rating,
        amenities_rating
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        buildingId,
        title,
        pros || null,
        cons || null,
        overallReview,
        ratings?.overall ?? null,
        ratings?.socialLife ?? null,
        ratings?.comfort ?? null,
        ratings?.safety ?? null,
        ratings?.distance ?? null,
        ratings?.amenities ?? null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting review:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List reviews for a building
app.get("/api/buildings/:id/reviews", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE building_id = $1 ORDER BY created_at DESC",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/////////////////////////////////
// EMAIL VERIFICATION ENDPOINT //
/////////////////////////////////

// 1) send verification code
app.post("/api/send-code", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith("@columbia.edu")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    await pool.query(
      "INSERT INTO email_codes (email, code, created_at) VALUES ($1,$2,NOW())",
      [email, code]
    );

    // TODO: send real email. For now we just log it for testing.
    console.log(`Verification code for ${email}: ${code}`);

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving email code:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2) verify code
app.post("/api/verify-code", async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM email_codes
       WHERE email = $1 AND code = $2
       ORDER BY created_at DESC
       LIMIT 1`,
      [email, code]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ success: false });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error verifying code:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

////////////////////////////

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
