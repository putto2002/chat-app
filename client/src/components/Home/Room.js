import classes from '../../styles/Home.module.scss';
import { useContext } from 'react';
import userContext from '../../contexts/UserContext';
import roomContext from '../../contexts/RoomContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle}  from '@fortawesome/free-solid-svg-icons';
const Room = (props) => {
    const user = useContext(userContext);
    const rooms = useContext(roomContext);

    const handleClick = () => {
        props.selectedRoom(props.data);
        rooms.joinRoom(props.data.roomID);
    }
    return (
        <div onClick={handleClick} className={classes.room}>
            <div className={classes.roomHeader}>
            <img  className={classes.friendsProfileImage} src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" />
            <h4 className={classes.friendsName}>{props.data.firstName} {props.data.lastName}</h4>
            </div>
            <FontAwesomeIcon className={classes.notificationIcon} icon={faCircle}/>
        </div>
    )
}

export default Room;