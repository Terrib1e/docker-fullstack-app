require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Routes
app.get("/", (req, res) => res.send("API is running!"));

app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  await pool.query("INSERT INTO tasks (title) VALUES ($1)", [title]);
  res.status(201).send("Task added");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
