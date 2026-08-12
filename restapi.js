import express from "express";
const app = express();
app.use(express.json());

let idCounter = 3; // since we already have 2 sample notes
let notes = [
  { id: 1, title: "First Note", content: "This is my first sample note." },
  { id: 2, title: "Shopping List", content: "Milk, Bread, Eggs" }
];

// Create a new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json({ message: "Note added!", note: newNote });
});

// Read all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Read a single note
app.get("/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

// Update a note
app.put("/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  note.title = title;
  note.content = content;
  res.json({ message: "Note updated!", note });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex(n => n.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Note not found" });

  const deletedNote = notes.splice(index, 1);
  res.json({ message: "Note deleted!", note: deletedNote });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
