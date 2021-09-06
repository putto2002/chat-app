import classes from "../../styles/Home.module.scss";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes}  from '@fortawesome/free-solid-svg-icons';
import SuggestedFriend from "./SuggestedFriend";
import userContext from "../../contexts/UserContext";
const SearchFriend = (props) => {
  const user = useContext(userContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if(searchTerm !== ""){
        axios
      .get(`http://localhost:5000/api/user/search/${searchTerm}/${user.user[0].username}`)
      .then((res) => res.data)
      .then((data) => setSearchResult(data))
      .catch((error) => console.error(error))
    } else {
        setSearchResult('')
    }
  }, [searchTerm]);

  const handleAddFriend = (username) => {
    const updatedSuggestedFriends = searchResult.filter((suggestedFriend) => suggestedFriend.username !== username);
    setSearchResult(updatedSuggestedFriends);

  }

  return (
    <div className={classes.blurer}>
      <button className={classes.exitSearchFriendButton}><FontAwesomeIcon icon={faTimes} onClick={props.onExitSearchFriends}/></button>
      <div className={classes.searchFriendContainer}>
          
        <div className={classes.searchFriendInputContainer}>
        <input
        className={classes.searchFriendInput}
          type="text"
          placeholder="search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        
        <div className={classes.suggestedFriendsContainer}>
        <div className={classes.suggestedFriends}>
            {searchResult.length > 0 ? searchResult.map((friend, index) => <SuggestedFriend onAddFriend={handleAddFriend} key={index} data={friend}/>) : <h3 style={{color: 'var(--green)'}}>No result</h3>}
        </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFriend;
