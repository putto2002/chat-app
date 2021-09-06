import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>
         
            </Switch>

        </Router>
    )
}

export default Routing;