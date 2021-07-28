const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors")
const io = require("socket.io")(http, {
  cors: {
    origin: "http://10.249.78.163:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://10.249.78.163:3000",
  methods: ["GET", "POST"]
}))

const PORT = 5000;


http.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
})

io.on('connection', (socket) => {
  console.log('new client connected');

  socket.on('join_room', (roomId, username) => {
    socket.join(roomId);
    console.log(`${username} join room ${roomId}`);

  })

  socket.on('disconnect', () => {
    console.log('a client disconnected');
  })
})
