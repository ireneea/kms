import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { TWord } from "../../ts/appTypes";

import { getAll as getAllWords, addWord } from "../../api/words";

import Page from "../Page/Page";
import Search from "./Search";
import WordList from "./WordList";
import AddWord from "./AddWord";
import useApiCall from "../../hooks/useApiCall";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    searchGrid: {
      marginTop: theme.spacing(2),
    },
    newWordListItem: {
      // paddingBottom: theme.spacing(2),
    },
  })
);

const getNewWord = (): TWord => {
  const id = "_" + Math.random().toString(36).substr(2, 9);
  const word: TWord = {
    id,
    concept: "",
    definition: "",
  };
  return word;
};

type Prop = {};

/**
 * `WordListPage` displays all the words of the users dictionary
 */
const WordListPage: React.FC<Prop> = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [words, setWords] = React.useState((): TWord[] => []);
  const [newWord, setNewWord] = React.useState(getNewWord);
  // OPTIMIZE: add a loading indicator
  // OPTIMIZE: handle error gracefully
  const { lastResponse, lastError, isLoading: isApiLoading, callApi } = useApiCall();

  React.useEffect(() => {
    const load = async () => {
      const data = await getAllWords();
      setWords(data);
    };

    callApi(load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (search: string) => {
    setSearchText(search);
  };

  const onWordInputKeyDown: React.KeyboardEventHandler = (event) => {
    const saveNewWord = async () => {
      if (newWord) {
        const data = await addWord(newWord);
        setWords(data);
        setNewWord(getNewWord());
      }
    };

    if (event.key === "Enter" && newWord.concept) {
      callApi(saveNewWord);
    }
  };

  const onWordInputChange = (value: string) => {
    if (newWord) {
      const updatedWord = { ...newWord };
      updatedWord.concept = value;
      setNewWord(updatedWord);
    }
  };

  return (
    <Page>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} className={classes.searchGrid}>
            <Search searchText={searchText} onChange={onSearch} />
          </Grid>
          <Grid item xs={12}>
            <AddWord
              onKeyDown={onWordInputKeyDown}
              word={newWord?.concept || ""}
              onChange={onWordInputChange}
              disabled={isApiLoading}
            />
            <WordList words={words} searchText={searchText} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default WordListPage;
