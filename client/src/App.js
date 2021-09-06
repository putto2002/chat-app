import Routing from "./components/global/Routing";
import { UserContextProvider } from "./contexts/UserContext";
import io from "socket.io-client";

const SERVER = "http://localhost:5000";
export const socket = io(SERVER);

const  App = () => {
  return (
    <>
   
    <UserContextProvider>
    <Routing/>
    </UserContextProvider>

    </>
  );
}

export default App;
