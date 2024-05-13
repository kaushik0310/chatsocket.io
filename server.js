const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

//dotenv config
const dotenv = require("dotenv");
dotenv.config();

//db connection
const connectDb = require("./config/db");
connectDb();

//middlewares
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port no. : ${PORT}`);
});
