import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { TWord } from "../../ts/appTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    selected: {},
  })
);

type Props = {
  words: TWord[];
  searchText?: string;
  handleSelectWord: (word: TWord) => void;
  selectedWord: TWord | undefined;
};

const isWordSelected = (selected: TWord | undefined, current: TWord | undefined) => {
  let isSelected = false;

  if (selected && selected.id && current && current.id) {
    isSelected = selected.id === current.id;
  }

  return isSelected;
};

const WordList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { words, searchText, handleSelectWord, selectedWord } = props;

  const filterWords = (): TWord[] => {
    let filtered = [...words];

    if (searchText) {
      filtered = words.filter((word) => word.concept.toLowerCase().includes(searchText.toLowerCase()));
    }

    return filtered;
  };

  return (
    <List className={classes.root}>
      {filterWords().map((word) => {
        return (
          <ListItem
            button
            key={word.concept}
            onClick={() => handleSelectWord(word)}
            selected={isWordSelected(selectedWord, word)}
          >
            <ListItemText primary={word.concept} secondary={word.definition} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default WordList;
