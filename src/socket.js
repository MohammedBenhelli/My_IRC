import connect from "socket.io-client";
const socket = connect("http://localhost:4242");
export default socket;