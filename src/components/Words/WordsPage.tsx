import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Page from "../Page/Page";

import Search from "./Search";
import { WordType } from "../../ts/appTypes";
import { words } from "../../constants";

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

const Word = (word: WordType) => {
  const classes = useStyles();

  const { concept } = word;
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>{concept}</Paper>
    </Grid>
  );
};

type Prop = {};

const WordsPage: React.FC<Prop> = (props) => {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");

  const onSearch = (search: string) => {
    setSearchText(search);
  };

  const filterWords = (): WordType[] => {
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
          <Grid container item spacing={1} direction="column">
            {filterWords().map((word) => (
              <Word {...word} key={word.concept} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default WordsPage;
