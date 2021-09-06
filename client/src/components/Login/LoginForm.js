import classes from "../../styles/Login.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFingerprint, faLock}  from '@fortawesome/free-solid-svg-icons';
const LoginForm = (props) => {
  const [loginDetails, setLoginDetails] = useState({});

  const handleClick = () => {
    props.onLogin(loginDetails);
  };
  return (
    <div className={classes.loginFormContainer}>
      <div className={classes.inputContainer}>
        <FontAwesomeIcon icon={faFingerprint} className={classes.inputIcon}/>
        <input
          className={classes.input}
          type="text"
          placeholder="username"
          onChange={(e) =>
            setLoginDetails((prevLoginDetails) => ({
              ...prevLoginDetails,
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
            setLoginDetails((prevLoginDetails) => ({
              ...prevLoginDetails,
              password: e.target.value,
            }))
          }
        />
      </div>

      <button className={classes.loginButton} onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
