import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connection to MySQL established");
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
