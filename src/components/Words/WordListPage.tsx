import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";

import { TWord } from "../../ts/appTypes";

import { getAll as getAllWords, addWord } from "../../api/words";

import ListItemLink from "../shared/ListItemLink";
import Page from "../Page/Page";
import Search from "./Search";

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

const WordListPage: React.FC<Prop> = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [words, setWords] = React.useState((): TWord[] => []);
  const [isAdding, setIsAdding] = React.useState(false);
  const [newWord, setNewWord] = React.useState((): TWord | undefined => undefined);
  // OPTIMIZE: add a loading indicator
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadWords = async () => {
      await loadData(async () => {
        const data = await getAllWords();
        setWords(data);
      });
    };

    loadWords();
  }, []);

  const onSearch = (search: string) => {
    setSearchText(search);
  };

  const onAddNewWord = () => {
    setIsAdding(true);
    setNewWord(getNewWord());
  };

  const loadData = async (loader: () => Promise<any>) => {
    try {
      setLoading(true);
      await loader();
    } catch (error) {
      // TODO: handle the error gracefully
    } finally {
      setLoading(false);
    }
  };

  const onSaveNewWord = async () => {
    await loadData(async () => {
      if (newWord) {
        const data = await addWord(newWord);
        setWords(data);
        setIsAdding(false);
        setNewWord(undefined);
      }
    });
  };

  const onInputKeyDown: React.KeyboardEventHandler = (event) => {
    if (event.key === "Enter") {
      onSaveNewWord();
    }
  };

  const onNewWordFieldChange = (value: string, fieldName: string) => {
    if (newWord) {
      const updatedWord = { ...newWord };
      if (fieldName === "concept") {
        updatedWord.concept = value;
      } else if (fieldName === "definition") {
        updatedWord.definition = value;
      }
      setNewWord(updatedWord);
    }
  };

  const filterWords = (): TWord[] => {
    let filtered = [...words];

    if (searchText) {
      filtered = words.filter((word) => word.concept.toLowerCase().includes(searchText.toLowerCase()));
    }

    return filtered;
  };

  const renderNewWordListItem = () => {
    let result;
    if (isAdding) {
      result = (
        <ListItem className={classes.newWordListItem}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <InputBase
                placeholder="new word"
                inputProps={{ "aria-label": "new word" }}
                name="concept"
                onChange={(event) => onNewWordFieldChange(event.target.value, event.target.name)}
                onKeyDown={onInputKeyDown}
                disabled={loading}
                autoFocus
              />
            </Grid>
          </Grid>
        </ListItem>
      );
    } else {
      result = (
        <ListItem button className={classes.newWordListItem} onClick={onAddNewWord}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </ListItem>
      );
    }
    return result;
  };

  return (
    <Page>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} className={classes.searchGrid}>
            <Search searchText={searchText} onChange={onSearch} />
          </Grid>
          <Grid item xs={12}>
            <List>
              {renderNewWordListItem()}
              {filterWords().map((word) => (
                <ListItemLink
                  primary={word.concept}
                  secondary={word.definition}
                  key={word.concept}
                  to={`/words/${word.id}`}
                />
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default WordListPage;
