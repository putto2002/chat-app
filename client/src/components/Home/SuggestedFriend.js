import classes from '../../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import roomContext from '../../contexts/RoomContext';
import userContext from '../../contexts/UserContext';
import { IdGenerator } from '../../utilities/IdGenerator';

const SuggestedFriend = (props) => {
    const users = useContext(userContext);
    const rooms = useContext(roomContext)
     
    const onAddFriend = () => {
        const data = {roomID: IdGenerator(), clientA: users.user[0].username, clientB: props.data.username, firstName: props.data.firstName, lastName: props.data.lastName}
        rooms.createRoom(data);
        props.onAddFriend(props.data.username);

    }
    return (
        <div className={classes.suggestedFriend}>
            <div className={classes.roomHeader}>
            <img  className={classes.friendsProfileImage} src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" />
            <h4 className={classes.friendsName}>{props.data.firstName} {props.data.lastName}</h4>
            </div>
            <FontAwesomeIcon className={classes.addFriendIcon} onClick={onAddFriend} icon={faPlus}/>
        </div>
    )
}

export default SuggestedFriend;