const express = require("express");
const pool = require("./db");
const port = 3000;

const app = express();

app.use(express.json());

// Routes

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM schools");
    res.status(200).json({ children: data.rows });
  } catch (error) {
    res.status(200).json({ message: "There was an error please try again" });
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO schools (name, address) VALUES ($1, $2)", [
      name,
      location,
    ]);
    res.status(200).send({ message: "Successfully created record!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating record." });
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.listen(port, () => console.log(`Server started on ${port}`));
