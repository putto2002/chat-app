import classes from "../../styles/Login.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFingerprint, faLock, faUser}  from '@fortawesome/free-solid-svg-icons';
const RegistrationForm = (props) => {
  const [registrationDetails, setRegistrationDetails] = useState({});
  return (
    <div className={classes.RegistrationformContainer}>
         <div className={classes.inputContainer}>
         <FontAwesomeIcon icon={faUser} className={classes.inputIcon}/>
        <input
          className={classes.input}
          type="text"
          placeholder="first name"
          onChange={(e) =>
            setRegistrationDetails((prevregistrationDetails) => ({
              ...prevregistrationDetails,
              firstName: e.target.value,
            }))
          }
        />
      </div>

      <div className={classes.inputContainer}>
      <FontAwesomeIcon icon={faUser} className={classes.inputIcon}/>
        <input
          className={classes.input}
          type="text"
          placeholder="last name"
          onChange={(e) =>
            setRegistrationDetails((prevregistrationDetails) => ({
              ...prevregistrationDetails,
              lastName: e.target.value,
            }))
          }
        />
      </div>

      <div className={classes.inputContainer}>
     
      <FontAwesomeIcon icon={faFingerprint} className={classes.inputIcon}/>
        <input
          className={classes.input}
          type="text"
          placeholder="username"
          onChange={(e) =>
            setRegistrationDetails((prevregistrationDetails) => ({
              ...prevregistrationDetails,
              username: e.target.value,
            }))
          }
        />
      </div>

      <div className={classes.inputContainer}>
      <FontAwesomeIcon icon={faLock} className={classes.inputIcon}/>
        <input
          className={classes.input}
          type="password"
          placeholder="password"
          onChange={(e) =>
            setRegistrationDetails((prevregistrationDetails) => ({
              ...prevregistrationDetails,
              password: e.target.value,
            }))
          }
        />
        </div >

        <button
          className={classes.regButton}
          onClick={() => props.onRegistration(registrationDetails)}
        >
          Sign up
        </button>
      </div>
 
  );
};

export default RegistrationForm;
