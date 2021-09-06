import classes from "../../styles/Home.module.scss";
import { useContext } from "react";
import userContext from "../../contexts/UserContext";
const UserProfile = () => {
    const user = useContext(userContext);
    return (
        <div className={classes.userProfileContainer}>
              <img className={classes.userProfileImage} src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" />
              <div className={classes.userProfileDetailsContainer}>
                <h4 className={classes.userName}>{user.user[0].firstName} {user.user[0].lastName}</h4>
                <h4 className={classes.userUsername}>{user.user[0].username}</h4>
              </div>
            </div>
    )
}

export default UserProfile;