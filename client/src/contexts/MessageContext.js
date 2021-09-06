import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../App";
import axios from "axios";
import userContext from "./UserContext";
import roomContext from "./RoomContext";

const messageContext = createContext({
  messages: [],
  sendMessage: (data) => {},
  filteredMessages: (roomID) => {},
});

const loaded = true;
export const MessageContextProvider = (props) => {
  
    


  

  const user = useContext(userContext);
  const rooms = useContext(roomContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/message/retreive/${user.user[0].username}`
      )
      .then((res) => res.data)
      .then((data) => {
        setMessages(data)
      })
      .catch((error) => console.error(error));
  }, [loaded]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/message/retreive/${user.user[0].username}`
      )
      .then((res) => res.data)
      .then((data) => {
        setMessages(data)
      })
      .catch((error) => console.error(error));
  }, [rooms]);




  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => prevMessages.concat(data));
      console.log(data);
    });
  }, []);


  const handleSendMessage = async (data) => {
    await socket.emit("send-message", data);
    setMessages((prevMessages) => prevMessages.concat(data));
  };

  console.log(messages);

  const handleFilterMessages = (roomID) => {
    var filteredMessages = [];
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].roomID === roomID) {
        filteredMessages.push(messages[i]);
      }
    }
    return filteredMessages;
  };

  const context = {
    messages: messages,
    sendMessage: handleSendMessage,
    filteredMessages: handleFilterMessages,
  };

  return (
    <messageContext.Provider value={context}>
      {props.children}
    </messageContext.Provider>
  );
};

export default messageContext;
