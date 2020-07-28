import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { TWord } from "../../ts/appTypes";

import { getAll as getAllWords } from "../../api/words";

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
  })
);

type Prop = {};

const WordsPage: React.FC<Prop> = (props) => {
  // OPTIMIZE: add a loading indicator

  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [words, setWords] = React.useState((): TWord[] => []);

  React.useEffect(() => {
    const loadWords = async () => {
      const data = await getAllWords();
      setWords(data);
    };

    loadWords();
  }, []);

  const onSearch = (search: string) => {
    setSearchText(search);
  };

  const filterWords = (): TWord[] => {
    let filtered = [...words];

    if (searchText) {
      filtered = words.filter((word) => word.concept.toLowerCase().includes(searchText.toLowerCase()));
    }

    return filtered;
  };

  return (
    <Page>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} className={classes.searchGrid}>
            <Search searchText={searchText} onChange={onSearch} />
          </Grid>
          <Grid item xs={12} spacing={1} direction="column">
            <List>
              {filterWords().map((word) => (
                <ListItemLink
                  primary={word.concept}
                  secondary={word.definition}
                  key={word.concept}
                  to={`/words/${word.concept}`}
                />
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default WordsPage;
