const mongoose = require("mongoose");

const MongoURI =
  "mongodb+srv://sourav:sourav@cluster0.7dnsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Mongoose is connected on ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDb;
