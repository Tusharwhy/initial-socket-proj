require("./db");
const getDb = require("./db");
const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
const axios = require("axios");

const dotenv = require("dotenv");

app.use(cors());
dotenv.config();

// app.use(express.json());

io.on("connection", async (socket) => {
  console.log("socket is active");
  // Fetch messages from MongoDB
  const db = await getDb();
  const messagesCollection = db.collection("messages");
  const messages = await messagesCollection.find().toArray();

  // Emit messages to the client
  socket.emit("load old msgs", messages);

  socket.on("chat", async ({ message, userName }) => {
    try {
      await messagesCollection.insertOne({
        message,
        userName,
        timestamp: new Date(),
      });
      io.emit("chat", { message, userName }); // Emit to all clients
    } catch (error) {
      console.error(error);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World from Taskomaster!");
});

server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(
    `Backend server is running! on Port: ${process.env.PORT || 5000} `
  );
});
