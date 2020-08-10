import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import { TWord } from "../../ts/appTypes";

import ListItemLink from "../shared/ListItemLink";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

type Props = {
  words: TWord[];
  searchText?: string;
};

const WordList: React.FC<Props> = ({ words, searchText }) => {
  const classes = useStyles();

  const filterWords = (): TWord[] => {
    let filtered = [...words];

    if (searchText) {
      filtered = words.filter((word) => word.concept.toLowerCase().includes(searchText.toLowerCase()));
    }

    return filtered;
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
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
  );
};

export default WordList;
