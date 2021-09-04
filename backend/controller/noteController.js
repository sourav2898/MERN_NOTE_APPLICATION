const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(401);
    throw new Error("Please fill all the fields");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save();

    res.status(200).json(createdNote);
  }
});

const updateNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category, user } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("You dont have permision to update.");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note to be updated not found ");
  }
});

const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.status(200).json(note);
  } else {
    res.status(400).json("Note not found");
  }
});

const deleteNote = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("You dont have permision to delete.");
  }
  if (note) {
    await note.remove();
    res.status(200).json({ message: "Note deleted" });
  } else {
    res.status(404);
    throw new Error("Note to be deleted not found ");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
