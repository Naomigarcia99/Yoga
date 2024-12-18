import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM events", (err, results) => {
    if (err) {
      console.error("Error getting events: ", err);
      res.status(500).json({ error: "Error getting events" });
      return;
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { title, start, end, allDay } = req.body;
  const db = req.db;
  db.query(
    "INSERT INTO events (title, start, end, allDay) VALUES (?, ?, ?, ?)",
    [title, start, end, allDay],
    (err, result) => {
      if (err) {
        console.log("-->ERRORRR!!!!", err);
        res.status(500).json({ error: "Error creating event" });
        return;
      }
      res.status(201).json({ message: "Event created", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { title, start, end, allDay } = req.body;
  const { id } = req.params;
  const db = req.db;
  db.query(
    "UPDATE event SET title = ?, start = ?, end = ?, allDay = ? WHERE id = ?",
    [title, start, end, allDay, id],
    (err, result) => {
      if (err) {
        console.error("Error updating event: ", err);
        res.status(500).json({ error: "Error updating event" });
        return;
      }
      res.json({ message: "Event updated", id, title, start, end, allDay });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting event: ", err);
      res.status(500).json({ error: "Error deleting event" });
      return;
    }
    res.status(200).json({ message: "Event deleted" });
  });
});

export default router;
