import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { TWord, Severity } from "./ts/appTypes";

import WordList from "./components/Words/WordList";
import LearnPage from "./components/Learn/LearnPage";
import WordDetailsPage from "./components/Words/WordDetailsPage";

import Header from "./components/Layout/Header";
import NavigationDrawer from "./components/Layout/NavigationDrawer";
import PageContent from "./components/Layout/PageContent";
import AppProcessFeedback from "./components/Layout/AppProcessFeedback";
import WordDialogForm from "./components/Words/WordDialogForm";

import useAsync from "./hooks/useAsync";
import { addWord, getAllWords, updateWord } from "./api/words";

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
  // TODO: remove word
  const classes = useStyles();

  const [words, setWords] = React.useState((): TWord[] => []);
  // OPTIMIZE: create a useFeedback hook and maybe combine it with the `AppProcessFeedback` component
  const [feedback, setFeedback] = React.useState<Feedback | undefined>(undefined);
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [snackbarOpened, setSnackbarOpened] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [selectedWord, setSelectedWord] = React.useState<TWord | undefined>(undefined);

  const handleLoadSuccess = React.useCallback((data: TWord[]) => {
    setWords(data);
  }, []);

  const handleLoadError = React.useCallback((error: string) => {
    setFeedback({
      type: "error",
      message: error || "Load Failed: Unexpected Error",
    });
  }, []);

  const getAllWordsApi = useAsync<TWord[], string>(getAllWords, {
    handleSuccess: handleLoadSuccess,
    handleError: handleLoadError,
  });

  const handleSaveSuccess = React.useCallback((data: TWord[]) => {
    setWords(data);

    setFeedback({
      type: "success",
      message: "Word Saved",
    });
  }, []);

  const handleSaveError = React.useCallback((error: string) => {
    setFeedback({
      type: "error",
      message: error || "Save Failed: Unexpected Error",
    });
  }, []);

  const addWordApi = useAsync<TWord[], string>(addWord, {
    handleSuccess: handleSaveSuccess,
    handleError: handleSaveError,
  });
  const updateWordApi = useAsync<TWord[], string>(updateWord, {
    handleSuccess: handleSaveSuccess,
    handleError: handleSaveError,
  });

  /** Loads all the words on the first render */
  React.useEffect(() => {
    getAllWordsApi.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Open the snackbar feedback whenever there is a new api call result */
  React.useEffect(() => {
    if (feedback?.message) {
      setSnackbarOpened(true);
    }
  }, [feedback]);

  React.useEffect(() => {
    if (selectedWord) {
      setDialogOpened(true);
    } else {
      setDialogOpened(false);
    }
  }, [selectedWord]);

  const closeDialog = () => {
    setDialogOpened(false);
    setSelectedWord(undefined);
  };

  const createNewWord = () => {
    setSelectedWord(getEmptyWord());
  };

  const closeSnackbar = () => {
    setSnackbarOpened(false);
  };

  const saveWord = async () => {
    // there is no need for error handling here because this should be done in the `useAsync` hook
    if (selectedWord) {
      if (selectedWord.id) {
        await updateWordApi.execute(selectedWord);
      } else {
        await addWordApi.execute(selectedWord);
      }
      setSelectedWord(undefined); // this resets the new word to an empty value
    }
  };

  const handleSelectWord = React.useCallback((word: TWord) => {
    setSelectedWord(word);
  }, []);

  const renderWordsList = React.useCallback(
    () => (
      <WordList words={words} searchText={searchText} handleSelectWord={handleSelectWord} selectedWord={selectedWord} />
    ),
    [words, searchText, handleSelectWord, selectedWord]
  );

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <Router>
      {/** MAIN APPLICATION */}
      <div className={classes.root}>
        <Header shiftLeft={true} searchText={searchText} handleSearchChange={handleSearchChange} />
        <NavigationDrawer onAddWord={createNewWord} />
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
        word={selectedWord}
        handleCloseModal={closeDialog}
        handleSaveClick={saveWord}
        handleWordChange={setSelectedWord}
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
