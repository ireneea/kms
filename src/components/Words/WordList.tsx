import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { TWord, TTopic } from "../../ts/appTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    selected: {},
  })
);

type WordListProps = {
  words: TWord[];
  searchText?: string;
  handleSelectWord: (word: TWord) => void;
  selectedWord: TWord | undefined;
  topic?: TTopic;
};

const isWordSelected = (selected: TWord | undefined, current: TWord | undefined) => {
  let isSelected = false;

  if (selected && selected.id && current && current.id) {
    isSelected = selected.id === current.id;
  }

  return isSelected;
};

const doesWordMatchSearchText = (word: TWord, searchText: string = "") => {
  let matchConcept = true;
  if (searchText) {
    matchConcept = word.concept?.toLowerCase().includes(searchText.toLowerCase());
  }

  return matchConcept;
};

const doesWordMatchTopic = (word: TWord, topic?: TTopic) => {
  let matchTopic = true;
  if (topic && topic.id) {
    matchTopic = !!word.topics && word.topics.length > 0 && word.topics.includes(topic.id);
  }

  return matchTopic;
};

const WordList: React.FC<WordListProps> = (props) => {
  // TODO: display topic header
  const classes = useStyles();
  const { topic, words, searchText, handleSelectWord, selectedWord } = props;

  const [filteredWords, setFilteredWords] = React.useState<TWord[]>([]);

  React.useEffect(() => {
    const filtered = words.filter((word) => {
      const matchConcept = doesWordMatchSearchText(word, searchText);
      const matchTopic = doesWordMatchTopic(word, topic);

      return matchTopic && matchConcept;
    });

    setFilteredWords(filtered);
  }, [words, searchText, selectedWord, topic]);

  return (
    <List className={classes.root}>
      {filteredWords.map((word) => {
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
