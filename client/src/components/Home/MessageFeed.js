import classes from "../../styles/Chat.module.scss";
import { useState, useEffect, useContext, useRef } from "react";
import userContext from "../../contexts/UserContext";
import Message from "./Message";
import messageContext from "../../contexts/MessageContext";


const MessageFeed = (props) => {
  const userCtx = useContext(userContext);
  const messagesCtx = useContext(messageContext);
  const [messages, setMessages]= useState([])



  const lastMessageRef = useRef();



  useEffect(() => {
      if(lastMessageRef.current){
        lastMessageRef.current.scrollIntoView({smooth: true});
      }
  })


  useEffect(() => {
    setMessages(isLocalMessage(messagesCtx.filteredMessages(props.selectedRoom.roomID), userCtx.user[0].username))
  }, [messagesCtx])

  console.log(messages)


  return (
    <div ref={lastMessageRef} className={classes.messageFeedContainer}>
      {messages.length > 0 && messages.map((message, index) => {
       
       return <Message ref={index !== messagesCtx.filteredMessages().length - 1 ? lastMessageRef : null} key={index} message={message} />;
    
   
   })}
    </div>
  );
};

export default MessageFeed;

const isLocalMessage = (messages, username) => {
  var modMessages = [];
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].sender === username) {
      modMessages.push({ ...messages[i], isLocalMessage: true });
      console.log(modMessages);
    } else {
      modMessages.push({ ...messages[i], isLocalMessage: false });
    }
  }

  return modMessages;
};
