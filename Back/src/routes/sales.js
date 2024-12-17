import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM sales", (err, results) => {
    if (err) {
      console.error("Error getting sale: ", err);
      res.status(500).json({ error: "Error getting sales" });
      return;
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, quantity, date } = req.body;
  const db = req.db;
  db.query(
    "INSERT INTO sales (name, quantity, date) VALUES (?, ?, ?)",
    [name, quantity, date],
    (err, result) => {
      if (err) {
        console.log("-->ERRORRR!!!!", err);
        res.status(500).json({ error: "Error creating sale" });
        return;
      }
      res
        .status(201)
        .json({ message: "Sale created", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, quantity, date } = req.body;
  const { id } = req.params;
  const db = req.db;
  db.query(
    "UPDATE sales SET name = ?, quantity = ?, date= ? WHERE id = ?",
    [name, quantity, date, id],
    (err, result) => {
      if (err) {
        console.error("Error updating sale: ", err);
        res.status(500).json({ error: "Error updating sale" });
        return;
      }
      res.json({ message: "Sales updated", id, name, quantity, date });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM sales WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting sale: ", err);
      res.status(500).json({ error: "Error deleting sale" });
      return;
    }
    res.status(200).json({ message: "Sale deleted" });
  });
});

export default router;
