import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Naomi123",
  database: "mi_proyecto",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.stack);
    return;
  }
  console.log("Conexión a MySQL establecida");
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
