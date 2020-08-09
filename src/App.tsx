import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { TWord } from "./ts/appTypes";

import WordListPage from "./components/Words/WordListPage";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

import Header from "./components/Layout/Header";
import NavigationDrawer from "./components/Layout/NavigationDrawer";
import WordDialogForm from "./components/Words/WordDialogForm";

import { addWord } from "./api/words";

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

const getEmptyWord = (): TWord => ({ concept: "", definition: "" });

const App: React.FC<{}> = () => {
  const classes = useStyles();

  const [modalOpened, setModalOpened] = React.useState(false);
  const [newWord, setNewWord] = React.useState(getEmptyWord);

  const closeModal = () => {
    setModalOpened(false);
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const saveWord = async () => {
    try {
      await addWord(newWord);
    } catch (error) {
      // TODO: handle the error gracefully: we might want to use a snackbar
    }

    setNewWord(getEmptyWord()); // this resets the new word to an empty value
    closeModal();
  };

  return (
    <Router>
      {/** MAIN APPLICATION */}
      <div className={classes.root}>
        <Header shiftLeft={true} />
        <NavigationDrawer onAddWord={openModal} />
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

      {/** MODAL DIALOG */}
      <WordDialogForm
        isOpened={modalOpened}
        word={newWord}
        handleCloseModal={closeModal}
        handleSaveClick={saveWord}
        handleWordChange={setNewWord}
      />
    </Router>
  );
};

export default App;
