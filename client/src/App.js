import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Fields from "./components/Fields";
import Create from "./components/Create";
import Tool from "./components/Tool";
import Login from "./components/Login";
import setAuthToken from "./utils/setAuthToken"

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = ({ auth }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/fields" component={Fields} />
        <Route exact path="/fields/:selectedFieldID" component={Fields} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/tools/:toolID" component={Tool} />
      </Switch>
    </Router>
  );
};

export default App;
