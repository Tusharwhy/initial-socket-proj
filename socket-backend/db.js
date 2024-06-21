// const mongoose = require("mongoose");

// // MongoDB connection URL
// const mongoURI = "mongodb://localhost:27017/chat";

// // Connection options
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// // Establish the connection
// mongoose
//   .connect(mongoURI, options)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);

//     // Handle specific error conditions
//     if (error.name === "MongoNetworkError") {
//       console.error("Network error occurred. Check your MongoDB server.");
//     } else if (error.name === "MongooseServerSelectionError") {
//       console.error(
//         "Server selection error. Ensure" + " MongoDB is running and accessible."
//       );
//     } else {
//       // Handle other types of errors
//       console.error("An unexpected error occurred:", error);
//     }
//   });

// db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = async () => {
  if (!dbConnection) {
    try {
      await client.connect();
      dbConnection = client.db("chat"); // Use your database name
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  return dbConnection;
};
