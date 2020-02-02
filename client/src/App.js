import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Fields from "./components/Fields";
import Create from "./components/Create";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/fields" component={Fields} />
        <Route exact path="/create" component={Create} />
      </Switch>
    </Router>
  );
}

export default App;
