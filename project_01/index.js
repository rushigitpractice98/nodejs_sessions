import express from "express";
import users from "./MOCK_DATA_USERS.json" assert { type: "json" };
import fs from "fs";
import { db } from "./db.js";

const app = express();
const PORT = 8000;

// Middleware-plugin
app.use(express.urlencoded({ extended: false }));

//REST API ENDPONTS

//get all users
app.get("/api/users", async (req, res) => {
  try {
    const client = await db.connect();
    try {
      const result = await client.query("SELECT * FROM users");
      const users = result.rows;
      res.json(users);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get user by ID
app.get("/api/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const client = await db.connect();
    try {
      const result = await client.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = result.rows[0];

      if (!user)
        return res.status(400).json({ message: "User does not exist" });

      res.json(user);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST request
app.post("/api/users", async (req, res) => {
  try {
    const { first_name, last_name, email, gender, job_title } = req.body;

    // Check if all required fields are provided
    if (!first_name || !last_name || !email || !gender || !job_title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const client = await db.connect();

    try {
      const result = await client.query(
        "INSERT INTO users (first_name, last_name, email, gender, job_title) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [first_name, last_name, email, gender, job_title]
      );

      const newUser = result.rows[0];

      res.status(201).json(newUser);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//PATCH request
app.patch("/api/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { first_name, last_name, email, gender, job_title } = req.body;

  const updates = { first_name, last_name, email, gender, job_title };

  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(
      ([key, value]) => value !== undefined && value !== null
    )
  );

  if (Object.keys(filteredUpdates).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    const client = await db.connect();
    try {
      const setClause = Object.entries(filteredUpdates)
        .map(([key, value], index) => `${key} = $${index + 1}`)
        .join(", ");

      const values = Object.values(filteredUpdates);

      values.push(id);

      const result = await client.query(
        `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`,
        values
      );

      const updatedUser = result.rows[0];

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error updating user", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//delete request
app.delete("/api/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const client = await db.connect();
    try {
      const result = await client.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ status: `Deleted user:${id}` });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error deleting user", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log("Server started!!!!"));
