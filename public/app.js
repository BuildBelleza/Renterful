const express = require("express");
const { Pool } = require("pg");

// Initialize Express app
const app = express();

// Configure the database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "test",
  port: 5432, // Default PostgreSQL port is 5432
});

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
  } else {
    console.log("Connected to PostgreSQL database at:", res.rows[0].now);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
