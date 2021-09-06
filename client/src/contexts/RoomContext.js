import { createContext, useState, useEffect, useContext } from "react";
import { socket } from "../App";
import axios from "axios";
import userContext from "./UserContext";
import { on } from "events";
const roomContext = createContext({
  rooms: [],
  joinRoom: (data) => {},
  createRoom: (data) => {},
});

export const RoomContextProvider = (props) => {
  const user = useContext(userContext);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {

      axios
      .get(`http://localhost:5000/api/room/retreive/${user.user[0].username}`)
      .then((res) => res.data)
      .then((data) => setRooms(data))
      .catch((error) => console.error(error));
 

  }, [user]);


  const MINUTE_MS = 3000;

useEffect(() => {
  const interval = setInterval(() => {
    axios
      .get(`http://localhost:5000/api/room/retreive/${user.user[0].username}`)
      .then((res) => res.data)
      .then((data) => setRooms(data))
      .catch((error) => console.error(error));
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])

  

  const handleJoinRoom = (roomName) => {
    console.log(roomName);
    socket.emit("join-room", roomName);
  };

  const handleCreateRoom = (data) => {
    console.log(data);
    setRooms(rooms.concat(data));

    socket.emit('create-room', data);

    axios
      .post("http://localhost:5000/api/room/insert", data)
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const context = {
    rooms: rooms,
    joinRoom: handleJoinRoom,
    createRoom: handleCreateRoom,
  };

  return (
    <roomContext.Provider value={context}>
      {props.children}
    </roomContext.Provider>
  );
};

export default roomContext;
