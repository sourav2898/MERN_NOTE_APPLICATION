const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// api to register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = await req.body;

  const userExists = await User.findOne({ email });

  // checking whether a user exists!
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // creating a user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // if user created successfully save it in the db
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
  // else throw an error
  else {
    res.status(400);
    throw new Error("Error Ocurred at registering user!");
  }
});

// api for login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;

  const user = await User.findOne({ email });

  // checking if the user is present in the db and the password is correct
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
  // if email or password is wrong
  else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

module.exports = { registerUser, authUser };
