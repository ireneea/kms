import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WordsPage from "./components/Words/WordsPage";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WordsPage} />
        <Route exact path="/words" component={WordsPage} />
        <Route exact path="/words/:id" component={WordDetailsPage} />
        <Route exact path="/learn" component={LearnPage} />
      </Switch>
    </Router>
  );
}

export default App;
