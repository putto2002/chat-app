import classes from '../../styles/Home.module.scss';
import Room from './Room';
import roomContext from '../../contexts/RoomContext';
import { useContext } from 'react';
const Rooms = (props) => {

    const rooms = useContext(roomContext);
  
    return (
        <div className={classes.rooms}>
           {rooms.rooms.length > 0 && rooms.rooms.map((room, index) => (<Room selectedRoom={props.selectedRoom} key={index} data={room}/>))}


        </div>
    )
}

export default Rooms;