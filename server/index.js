const express = require("express");
const app = express();
const cors = require("cors");
const AuthenticationRoute = require("./routes/Authentication");
const RoomRoute = require("./routes/Room");
const messageRoute = require("./routes/Message");
const userRoute = require('./routes/User')
const db = require("./config/dbConfig");
const PORT = 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use("/api/auth", AuthenticationRoute);
app.use("/api/room", RoomRoute);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

const server = app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a client is connected to the server!`);

  socket.on("create-room", (data) => {
    socket.to(data.roomID).emit('invite-to-room', data);
  })

 

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`A client joined room ${room}`);
  });

  socket.on("send-message", (data) => {
    console.log(
      `${data.sender} send ${data.message} to ${data.receiver} via ${data.roomID}`
    );

    const sqlInsert =
      "INSERT INTO `message` (`roomID`, `message`, `sender`, `receiver`) VALUES (?, ?, ?, ?);";
    db.query(
      sqlInsert,
      [data.roomID, data.message, data.sender, data.receiver],
      (error, result) => {
        if (error) {
          console.error(error);
        }
        if (result) {
          socket.to(data.roomID).emit("receive-message", data);
          console.log(result);
        }
      }
    );
    
    
  });

  socket.on("disconnect", () => {
    console.log("a client disconnected");
  });
});
