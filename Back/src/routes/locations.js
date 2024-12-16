import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM locations", (err, results) => {
    if (err) {
      console.error("Error getting location: ", err);
      res.status(500).json({ error: "Error getting locations" });
      return;
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, latitude, longitude } = req.body;
  const db = req.db;
  db.query(
    "INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)",
    [name, latitude, longitude],
    (err, result) => {
      if (err) {
        console.log("-->ERRORRR!!!!", err);
        res.status(500).json({ error: "Error creating location" });
        return;
      }
      res
        .status(201)
        .json({ message: "Location created", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, longitude, latitude } = req.body;
  const { id } = req.params;
  const db = req.db;
  db.query(
    "UPDATE locations SET name = ?, longitude = ?, latitude= ? WHERE id = ?",
    [name, longitude, latitude, id],
    (err, result) => {
      if (err) {
        console.error("Error updating location: ", err);
        res.status(500).json({ error: "Error updating location" });
        return;
      }
      res.json({ message: "Locations updated", id, name, longitude, latitude });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM locations WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting location: ", err);
      res.status(500).json({ error: "Error deleting location" });
      return;
    }
    res.status(200).json({ message: "Location deleted" });
  });
});

export default router;
