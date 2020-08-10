import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { TWord } from "./ts/appTypes";

import WordList from "./components/Words/WordList";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

import Header from "./components/Layout/Header";
import NavigationDrawer from "./components/Layout/NavigationDrawer";
import WordDialogForm from "./components/Words/WordDialogForm";

import useAsync from "./hooks/useAsync";
import { addWord, getAllWords } from "./api/words";

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
  // TODO: mobile layout
  // TODO: Consolidate api statuses and error in state
  const classes = useStyles();

  const [modalOpened, setModalOpened] = React.useState(false);
  const getAllWordsApi = useAsync<TWord[], string>(getAllWords);
  const addWordApi = useAsync<TWord[], string>(addWord);

  const [words, setWords] = React.useState((): TWord[] => []);
  const [newWord, setNewWord] = React.useState(getEmptyWord);

  /**
   * Loads all the words on the first render
   */
  React.useEffect(() => {
    getAllWordsApi.execute();
  }, []);

  /**
   * Updates the words list when after `getAllWordsApi` returns new results
   */
  React.useEffect(() => {
    if (getAllWordsApi.value) {
      setWords(getAllWordsApi.value);
    }
  }, [getAllWordsApi.value]);

  /**
   * Handles `getAllWordsApi`  errors
   */
  React.useEffect(() => {
    // TODO: handle the error gracefully: we might want to use a snackbar
    if (getAllWordsApi.error) {
      console.log("getAllWordsApi", getAllWordsApi.error);
    }
  }, [getAllWordsApi.error]);

  /**
   * Updates the words list when after `addWordApi` returns new results
   */
  React.useEffect(() => {
    if (addWordApi.value) {
      setWords(addWordApi.value);
    }
  }, [addWordApi.value]);

  /**
   * Handles `addWordApi`  errors
   */
  React.useEffect(() => {
    // TODO: handle the error gracefully: we might want to use a snackbar
    if (addWordApi.error) {
      console.log("addWordApi", addWordApi.error);
    }
  }, [addWordApi.error]);

  const closeModal = () => {
    setModalOpened(false);
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const saveWord = async () => {
    await addWordApi.execute(newWord); // there is no need for error handling here because this should be done in the `useAsync` hook
    setNewWord(getEmptyWord()); // this resets the new word to an empty value
    closeModal();
  };

  // TODO: pass in search text
  const renderWordsList = React.useCallback(() => <WordList words={words} />, [words]);

  return (
    <Router>
      {/** MAIN APPLICATION */}
      <div className={classes.root}>
        <Header shiftLeft={true} />
        <NavigationDrawer onAddWord={openModal} />
        <main className={classes.content}>
          <div className={classes.offset} />
          <Switch>
            <Route exact path="/" component={renderWordsList} />
            <Route exact path="/words" render={renderWordsList} />
            <Route exact path="/words/:id" component={WordDetailsPage} />
            <Route exact path="/learn" component={LearnPage} />
            {/**
             * // OPTIMIZE Dashboard page
             * // OPTIMIZE Stats page
             */}
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
