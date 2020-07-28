import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WordListPage from "./components/Words/WordListPage";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WordListPage} />
        <Route exact path="/words" component={WordListPage} />
        <Route exact path="/words/:id" component={WordDetailsPage} />
        <Route exact path="/learn" component={LearnPage} />
      </Switch>
    </Router>
  );
}

export default App;
