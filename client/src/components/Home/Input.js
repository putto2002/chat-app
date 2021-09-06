import classes from '../../styles/Chat.module.scss';
import { useState, useContext, useEffect } from 'react';
import messageContext from '../../contexts/MessageContext';
import userContext from '../../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane}  from '@fortawesome/free-solid-svg-icons';

const Input = (props) => {
    const messages = useContext(messageContext);
    const user = useContext(userContext);
    const [inputMessage, setInputMessage] = useState('');
  
    
    const callHanleSendMessage = (e) => {
        if(e.key === 'Enter') {
            handleSendMessage()
        }
    }


    const getReceiver = () => {
        if(props.selectedRoom.clientA !== user.user[0].username){
            return props.selectedRoom.clientA;
        } else {
            return props.selectedRoom.clientB;
        }
    }

   
 

    const handleSendMessage = () => {
        const data = {roomID: props.selectedRoom.roomID, message: inputMessage, sender: user.user[0].username, receiver: getReceiver()};
        
        messages.sendMessage(data);
        setInputMessage('');
    }
    return (
        <div className={classes.inputContainer}>
            <div className={classes.messageInputContainer}>
            <input className={classes.messageInput} value={inputMessage} onKeyDown={callHanleSendMessage} onChange={(e) => setInputMessage(e.target.value)} type="text" />
            </div>
            
            <button onClick={handleSendMessage} className={classes.sendButton}><FontAwesomeIcon className={classes.sendIcond} icon={faPaperPlane}/></button>
        </div>
    )
}

export default Input;