// callController.js

const startCall = async (req, res, ) => {
  // console.log("Starting a call:", req.body);
  res.json({
    message: "call",
    success: true,
  });

  // // Socket.IO connection setup for this specific call
  // const callNamespace = "/call"; // Set a specific namespace for this call
  // const callIo = io.of(callNamespace);

  // callIo.on("connection", (socket) => {
  //   console.log("A user connected for the call");

  //   // Handle any specific events or logic related to this call

  //   socket.on("disconnect", () => {
  //     console.log("User disconnected from the call");
  //   });
  // });

  // // Your logic for starting a call

  // // Emit the 'start-call' event to all connected clients in the call namespace
  // callIo.emit("start-call", { message: "Call started!" });

  res.json({ message: "Call started!" });
};

const joinCall = async (req, res, io) => {
  console.log("Joining a call:", req.body);

  // Your logic for joining a call

  res.json({ message: "Call joined!" });
};

module.exports = { startCall, joinCall };
