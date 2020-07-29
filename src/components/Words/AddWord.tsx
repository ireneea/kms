import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(0),
    },
    newWordListItem: {
      paddingBottom: theme.spacing(0),
    },
  })
);

type TInputProp = {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: React.KeyboardEventHandler;
};

type Prop = {
  word: string;
  onChange: (value: string) => void;
  onKeyDown: React.KeyboardEventHandler;
  disabled?: boolean;
};

/**
 * `AddWord` is used to add a new word to the dictionary. It's presented as a list
 * with one add icon. When the users clicks one the add icon they can enter the new word
 * and press enter to save the word
 * @param props
 */
const AddWord: React.FC<Prop> = (props) => {
  const classes = useStyles();
  const { onChange, word, onKeyDown, disabled } = props;

  return (
    <List className={classes.root}>
      <ListItem className={classes.newWordListItem}>
        <InputBase
          placeholder="Add Word"
          inputProps={{ "aria-label": "new word" }}
          name="concept"
          autoFocus
          value={word}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </ListItem>
    </List>
  );
};

export default AddWord;
