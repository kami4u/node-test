const server = require("net").createServer();
let counter = 0;
let sockets = {};

const timeStamp = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

server.on("connection", (socket) => {
  socket.id = counter++;

  console.log("Client Connected");
  socket.write("Please type your name: \n");

  socket.on("data", (data) => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcom ${socket.name} \n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, cs]) => {
      if (socket.id == key) return;
      cs.write(`${socket.name}: ${timeStamp()}: `);
      cs.write(data);
    });
  });

  socket.on("end", () => {
    delete sockets[socket.id];
    console.log("Client disconnected");
  });
});

server.listen(8000, console.log("Server bound"));
