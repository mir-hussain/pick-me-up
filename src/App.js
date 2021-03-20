import { createContext, useState } from "react";
//css
import "./App.css";
//react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Destination from "./components/Destination/Destination";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    successful: false,
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/home'>
            <Main />
          </Route>
          <PrivateRoute path='/destination/:method'>
            <Destination />
          </PrivateRoute>
          <PrivateRoute path='/destination'>
            <Destination />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
