import Input from "../components/Home/Input";
import MessageFeed from "../components/Home/MessageFeed";
import Container from "../components/global/Container";
import Rooms from "../components/Home/Rooms";
import classes from "../styles/Home.module.scss";
import { MessageContextProvider } from "../contexts/MessageContext";
import { RoomContextProvider } from "../contexts/RoomContext";
import { useState , useContext} from "react";
import SearchFriend from "../components/Home/SearchFriend";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus}  from '@fortawesome/free-solid-svg-icons';
import UserProfile from "../components/Home/UserProfile";

const Home = () => {

  
  const [selectedRoom, setSelectedRoom] = useState({});
  const [showAddFriendPanel, setShowAddFriendPanel] = useState(false);
  console.log(selectedRoom)

  const handleSelectRoom = (data) => {
   
  
    setSelectedRoom(data);
    
  }

  return (
    <RoomContextProvider>
      <MessageContextProvider>
        <Container>
          <div className={classes.controlPanelContainer}>
            <UserProfile/>
            <div className={classes.addFriendContainer} onClick={() => setShowAddFriendPanel(true)}>
              
              <h4 className={classes.addFriendTitle}><FontAwesomeIcon icon={faPlus} className={classes.addFriendIcon}/>Add friends</h4>
            </div>
          <Rooms selectedRoom={handleSelectRoom}/>
          </div>
          
          <div className={classes.chatContainer}>
             <div className={classes.chatHeader}>
              <img className={classes.selectedUserProfileImage} src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" />
              <div className={classes.selectedUserProfileDetail}>
                <h4 className={classes.selectedUserName}>{selectedRoom.firstName} {selectedRoom.lastName}</h4>
                <h4 className={classes.selectedUserUsername}>{selectedRoom.username}</h4>
              </div>
            </div>
            
            <MessageFeed selectedRoom={selectedRoom}/>
            <Input selectedRoom={selectedRoom}/>
          </div>
          {showAddFriendPanel && <SearchFriend onExitSearchFriends={() => setShowAddFriendPanel(false)}/>}
        </Container>
      </MessageContextProvider>
    </RoomContextProvider>
  );
};

export default Home;
