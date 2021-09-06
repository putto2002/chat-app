import LoginForm from "../components/Login/LoginForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments, faLock, faUser}  from '@fortawesome/free-solid-svg-icons';
import classes from "../styles/Login.module.scss";
import { useState, useEffect, useContext } from "react";
import RegistrationForm from "../components/Login/RegistrationForm";
import { register, checkLogin, login } from "../utilities/Authentication";
import userContext from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
const Login = () => {
  const userCtx = useContext(userContext);
  const [form, setForm] = useState("loginForm");
  const history = useHistory();
  

  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res.status) {
        userCtx.addUser(res.user);
        history.push("/home");
        
        
      }
    })();
  }, []);

  async function handleLogin  (loginDetails) {
    const res = await login(loginDetails);
    if (res.status){
      userCtx.addUser(res.user);
      history.push("/home");
    } else {
      alert(res.message)
    }
  };

  function handleRegistration(registrationDetails) {
    register(registrationDetails);
  }

  function switchForm  () {
    if(form === "loginForm"){
      setForm("registrationForm");
    } else {
      setForm("loginForm")
    }

  }
  return (
    <div className={classes.pageContainer}>
      <h3 className={classes.logoText}><FontAwesomeIcon icon={faComments} className={classes.logoIcon}/>ChatApp</h3>
      {form === "loginForm" && <LoginForm onLogin={handleLogin} />}
      {form === "registrationForm" && (
        <RegistrationForm onRegistration={handleRegistration} />
      )}
      <h5 className={classes.switchFormButton} onClick={switchForm}>{form === 'loginForm' ? "Sign up" : "Login"}</h5>
    </div>
  );
};

export default Login;
