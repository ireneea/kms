import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { TWord, Severity, TTopic } from "./ts/appTypes";

import WordList from "./components/Words/WordList";
import LearnPage from "./components/Learn/LearnPage";

import Header from "./components/Layout/Header";
import NavigationDrawer from "./components/Layout/NavigationDrawer";
import PageContent from "./components/Layout/PageContent";
import AppProcessFeedback from "./components/Layout/AppProcessFeedback";
import WordDialogForm from "./components/Words/WordDialogForm";

import useAsync from "./hooks/useAsync";
import { addWord, getAllWords, updateWord, deleteWord } from "./api/words";
import WordForm from "./components/Words/WordForm";

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
  // TODO: optimise desktop layout
  // TODO: Add new topic
  // TODO: Add word to topic
  // OPTIMIZE: add topic slugs to the route so that we can immediately select a topic
  const classes = useStyles();

  const [words, setWords] = React.useState((): TWord[] => []);
  // OPTIMIZE: create a useFeedback hook and maybe combine it with the `AppProcessFeedback` component
  // TODO: combine async calls in a single manager
  const [feedback, setFeedback] = React.useState<Feedback | undefined>(undefined);
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [snackbarOpened, setSnackbarOpened] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [selectedWord, setSelectedWord] = React.useState<TWord | undefined>(undefined);
  const [selectedTopic, setSelectedTopic] = React.useState<TTopic | undefined>(undefined);

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

  const handleUpdateSuccess = React.useCallback((data: TWord[]) => {
    setWords(data);

    setFeedback({
      type: "success",
      message: "Word Saved",
    });
  }, []);

  const handleUpdateError = React.useCallback((error: string) => {
    setFeedback({
      type: "error",
      message: error || "Save Failed: Unexpected Error",
    });
  }, []);

  const addWordApi = useAsync<TWord[], string>(addWord, {
    handleSuccess: handleUpdateSuccess,
    handleError: handleUpdateError,
  });

  const updateWordApi = useAsync<TWord[], string>(updateWord, {
    handleSuccess: handleUpdateSuccess,
    handleError: handleUpdateError,
  });

  const handleDeleteSuccess = React.useCallback((data: TWord[]) => {
    setWords(data);

    setFeedback({
      type: "success",
      message: "Word Removed",
    });
  }, []);

  const handleDeleteError = React.useCallback((error: string) => {
    setFeedback({
      type: "error",
      message: error || "Remove Failed: Unexpected Error",
    });
  }, []);

  const deleteWordApi = useAsync<TWord[], string>(deleteWord, {
    handleSuccess: handleDeleteSuccess,
    handleError: handleDeleteError,
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

  const saveWord = async (word: TWord) => {
    // there is no need for error handling here because this should be done in the `useAsync` hook
    if (word) {
      // NOTES: [[~Why Useful]]:: Setting the selected word as undefined causes the modal to close immediately avoiding double click issues
      setSelectedWord(undefined);
      if (word.id) {
        await updateWordApi.execute(word);
      } else {
        await addWordApi.execute(word);
      }
    }
  };

  const removeWord = async () => {
    if (selectedWord) {
      // NOTES: [[~Why Useful]]:: Setting the selected word as undefined causes the modal to close immediately avoiding double click issues
      setSelectedWord(undefined);
      await deleteWordApi.execute(selectedWord);
    }
  };

  const handleSelectWord = React.useCallback((word: TWord) => {
    setSelectedWord(word);
  }, []);

  const renderWordsList = React.useCallback(
    () => (
      <WordList
        words={words}
        searchText={searchText}
        handleSelectWord={handleSelectWord}
        selectedWord={selectedWord}
        topic={selectedTopic}
      />
    ),
    [words, searchText, handleSelectWord, selectedWord, selectedTopic]
  );

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleSelectTopic = (topic: TTopic) => {
    setSelectedTopic(topic);
  };

  return (
    <>
      {/** MAIN APPLICATION */}
      <div className={classes.root}>
        <Header shiftLeft={true} searchText={searchText} handleSearchChange={handleSearchChange} />
        <Router>
          <NavigationDrawer onAddWord={createNewWord} onSelectTopic={handleSelectTopic} />
          <main className={classes.content}>
            <div className={classes.offset} />
            <PageContent>
              <WordForm topicId={selectedTopic?.id} topicTitle={selectedTopic?.title} saveWord={saveWord} />
              <Switch>
                <Route exact path="/" render={renderWordsList} />
                <Route exact path="/words" render={renderWordsList} />
                <Route exact path="/learn" component={LearnPage} />
                {/**
                 * // OPTIMIZE Dashboard page
                 * // OPTIMIZE Stats page
                 */}
              </Switch>
            </PageContent>
          </main>
        </Router>
      </div>

      {/** FORM DIALOG */}
      <WordDialogForm
        isOpened={dialogOpened}
        selectedWord={selectedWord}
        handleCloseModal={closeDialog}
        handleSaveClick={saveWord}
        handleRemoveClick={removeWord}
      />

      {/** SNACKBAR FEEDBACK */}
      <AppProcessFeedback
        isOpened={snackbarOpened}
        message={feedback?.message || ""}
        severity={feedback?.type || "info"}
        handleClose={closeSnackbar}
      />
    </>
  );
};

export default App;
