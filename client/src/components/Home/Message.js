import classes from '../../styles/Chat.module.scss';
import { forwardRef } from 'react';
const Message = (props, ref) => {
    console.log(props.message.isLocalMessage)
    return (
        <div  ref={ref} style={{alignItems: props.message.isLocalMessage === true ? "flex-end" : "flex-start"}} className={classes.messagesContainer}>
        
        <div  className={classes.messageContainer} >
            <h2 className={classes.message}>{props.message.message}</h2>

        </div>
        </div>
    )
}

export default forwardRef(Message);