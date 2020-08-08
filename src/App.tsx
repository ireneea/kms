import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WordListPage from "./components/Words/WordListPage";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Header from "./components/Layout/Header";
import NavigationDrawer from "./components/Layout/NavigationDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    offset: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const onAddWord = () => {
    // TODO: open a modal used to add a new word
  };

  return (
    <Router>
      <div className={classes.root}>
        <Header shiftLeft={true} />
        <NavigationDrawer onAddWord={onAddWord} />
        <main className={classes.content}>
          <div className={classes.offset} />
          <Switch>
            <Route exact path="/" component={WordListPage} />
            <Route exact path="/words" component={WordListPage} />
            <Route exact path="/words/:id" component={WordDetailsPage} />
            <Route exact path="/learn" component={LearnPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
