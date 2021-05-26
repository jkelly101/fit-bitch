import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import UserContext from "./utils/UserContext";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import "./app.css";
import API from "./utils/API";

function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    loadUser();
  }, [])

  function loadUser() {
    API.getUser()
      .then(res => 
        console.log('User Stuff Here')
      )
      .catch(err => console.log(err));
};

  return (
    <Router>
      <UserContext.Provider value={{email, setEmail, loggedIn, setLoggedIn}}>
        <div>
          <Nav />
          <Switch>
            <Route exact path={["/", "/signup"]}>
              <SignUp />            
            </Route>
            <Route exact path="/books/:bookid">
              <Detail />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/books">
            <Books />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
