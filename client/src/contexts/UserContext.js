import { createContext, useState } from "react";

const userContext = createContext({
  user: {},
  addUser: (data) => {},

});
const initialState = {};

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(initialState);


  const handleSetUser = (data) => {
    setUser(data);
  };

  const context = {
    user: user,
    addUser: handleSetUser,
  
  };
  return (
    <userContext.Provider value={context}>
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
