import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ListItemLink from "../shared/ListItemLink";
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
