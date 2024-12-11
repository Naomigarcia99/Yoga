import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const db = req.db;
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Error getting users");
      return;
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  const db = req.db;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.log("-->ERROR!!!",err)
        res.status(500).send("Error creating user");
        return;
      }
      //res.status(201).send("User created");
      res.status(201).json({ message: "Users created", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const db = req.db;
  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating user");
        return;
      }
      //res.send("Updated user");
      res.json({ id, name, email });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = req.db;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting user");
      return;
    }
    //res.send("User deleted");
    res.status(200).json({ message: "User deleted" });
  });
});

export default router;
