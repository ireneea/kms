import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
    <List className={classes.root}>
      {filterWords().map((word) => (
        <ListItemLink primary={word.concept} secondary={word.definition} key={word.concept} to={`/words/${word.id}`} />
      ))}
    </List>
  );
};

export default WordList;
