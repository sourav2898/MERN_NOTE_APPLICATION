const express = require("express");
// const dotenv = require("dotenv");
const notes = require("../backend/data/notes");
const connectDB = require("./Conn/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// dotenv.config();
const PORT = 5000;
connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Welcome to the note application");
// });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//   const id = req.params.id;

//   const note = notes.find((note) => note._id == id);
//   if (note === null || note === undefined || note.length === 0) {
//     res.send(`Note with id:${id} not available`);
//   } else res.json(note);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
