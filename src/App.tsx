import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { TWord, AsyncStatuses, Severity } from "./ts/appTypes";

import WordList from "./components/Words/WordList";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

import Header from "./components/Layout/Header";
import NavigationDrawer from "./components/Layout/NavigationDrawer";
import PageContent from "./components/Layout/PageContent";
import AppProcessFeedback from "./components/Layout/AppProcessFeedback";
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

type Feedback = {
  type: Severity;
  message: string;
};

const App: React.FC<{}> = () => {
  // TODO: mobile layout
  // TODO: Consolidate api statuses and error in state
  const classes = useStyles();

  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [snackbarOpened, setSnackbarOpened] = React.useState(false);
  const getAllWordsApi = useAsync<TWord[], string>(getAllWords);
  const addWordApi = useAsync<TWord[], string>(addWord);

  const [words, setWords] = React.useState((): TWord[] => []);
  const [newWord, setNewWord] = React.useState(getEmptyWord);

  const [feedback, setFeedback] = React.useState<Feedback | undefined>(undefined);

  /**
   * Loads all the words on the first render
   */
  React.useEffect(() => {
    getAllWordsApi.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (getAllWordsApi.error) {
      setFeedback({
        type: "error",
        message: getAllWordsApi.error,
      });
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
   * Updates the feedback based on the `addWordApi` calls statuses
   */
  React.useEffect(() => {
    // OPTIMIZE: this could use a re-usable feedback hook.
    if (addWordApi.status === AsyncStatuses.SUCCESS) {
      setFeedback({
        type: "success",
        message: "New Word Added",
      });
    } else if (addWordApi.status === AsyncStatuses.ERROR) {
      setFeedback({
        type: "error",
        message: addWordApi.error || "Save Failed: Unexpected Error",
      });
    }
  }, [addWordApi.status, addWordApi.error]);

  React.useEffect(() => {
    if (feedback?.message) {
      setSnackbarOpened(true);
    }
  }, [feedback]);

  const closeDialog = () => {
    setDialogOpened(false);
  };

  const openDialog = () => {
    setDialogOpened(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpened(false);
    setFeedback(undefined); // this just ensures that we always use a new feedback when a new snackbar is opened
  };

  const saveWord = async () => {
    await addWordApi.execute(newWord); // there is no need for error handling here because this should be done in the `useAsync` hook
    setNewWord(getEmptyWord()); // this resets the new word to an empty value
    closeDialog();
  };

  // TODO: pass in search text
  const renderWordsList = React.useCallback(() => <WordList words={words} />, [words]);

  return (
    <Router>
      {/** MAIN APPLICATION */}
      <div className={classes.root}>
        <Header shiftLeft={true} />
        <NavigationDrawer onAddWord={openDialog} />
        <main className={classes.content}>
          <div className={classes.offset} />
          <PageContent>
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
          </PageContent>
        </main>
      </div>

      {/** FORM DIALOG */}
      <WordDialogForm
        isOpened={dialogOpened}
        word={newWord}
        handleCloseModal={closeDialog}
        handleSaveClick={saveWord}
        handleWordChange={setNewWord}
      />

      {/** SNACKBAR FEEDBACK */}
      <AppProcessFeedback
        isOpened={snackbarOpened}
        message={feedback?.message || ""}
        severity={feedback?.type || "info"}
        handleClose={closeSnackbar}
      />
    </Router>
  );
};

export default App;
