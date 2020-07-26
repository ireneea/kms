import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WordsScreen from "./components/Words/WordsScreen";
import LearnScreen from "./components/Learn/LearnScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WordsScreen} />
        <Route exact path="/words" component={WordsScreen} />
        <Route exact path="/learn" component={LearnScreen} />
      </Switch>
    </Router>
  );
}

export default App;
