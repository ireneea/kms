import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import _isNil from "lodash/isNil";
import { TWord } from "../../ts/appTypes";
import useAsync from "../../hooks/useAsync";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 1),
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      padding: 0,
      width: "100%",
    },
  })
);

interface WordFormProps {
  topicId?: string;
  topicTitle?: string;
  saveWord: (word: TWord) => Promise<void>;
}

const WordForm: React.FC<WordFormProps> = (props) => {
  const classes = useStyles();

  const { topicId, topicTitle } = props;
  const [inputValue, setInputValue] = React.useState("");

  // NOTES: errors should be handled in the parent component
  const { execute: saveWord } = useAsync(props.saveWord, { handleSuccess: () => setInputValue("") });

  const placeholder = React.useMemo(() => {
    let value = "Add a new word";

    if (topicId && topicTitle) {
      value = `Add a new word to ${topicTitle}`;
    }

    return value;
  }, [topicId, topicTitle]);

  const keyDownHandler: React.KeyboardEventHandler = (event) => {
    // NOTES: By default when the user press the Enter key we save word
    // NOTES: To enter a new line the user must use Shift + Enter
    if (event.key === "Enter" && event.keyCode === 13 && !event.shiftKey) {
      const word = inputValueToWord(inputValue, topicId);
      if (word) {
        saveWord(word);
      }

      event.preventDefault(); // this prevents adding a new line to the input
    }
  };

  const handleInputValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!_isNil(event.target.value)) {
      setInputValue(event.target.value);
    }
  };

  return (
    <div className={classes.root}>
      <InputBase
        className={classes.root}
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={handleInputValueChange}
        onKeyDown={keyDownHandler}
        value={inputValue}
        multiline
      />
    </div>
  );
};

/**
 * Splits the `inputValue` into two parts the first part will be used as `word.concept` and the second part will be the definition
 * @param inputValue a string value that will be used to create a TWord
 * @param topicId The id of the word to add
 * @return a new word or undefined if the `inputValue` is invalid
 */
const inputValueToWord = (inputValue: string, topicId?: string): TWord | void => {
  // guard
  if (!inputValue) {
    return;
  }

  const lines = inputValue.split("\n");
  // the second part of the or should never be executed because we check that the `inputValue` is set in the guard
  const concept = lines.shift() || inputValue;
  // OPTIMIZE: trim the generated word form the empty lines and trailing spaces
  const definition = lines.join("\n");

  const word: TWord = {
    concept,
    definition,
    topics: topicId ? [topicId] : [],
  };

  return word;
};

export default WordForm;
