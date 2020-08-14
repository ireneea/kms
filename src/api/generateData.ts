import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { TWord, TCard, TTopic } from "../ts/appTypes";
import DEFAULT_WORDS from "./default_words";
import DEFAULT_TOPICS from "./default_topics";

export const generateNewCard = (word: TWord): TCard => ({
  id: uuidv4(),
  dueDate: moment(),
  front: word.concept,
  back: word.definition,
  wordId: word.id,
});

export const generateData = (): { words: TWord[]; cards: TCard[]; topics: TTopic[] } => {
  const words: TWord[] = [];
  const cards: TCard[] = [];

  for (let i = 0; i < DEFAULT_WORDS.length; i++) {
    const word = DEFAULT_WORDS[i];
    const card = generateNewCard(word);
    cards.push(card);
    words.push({ ...word, id: uuidv4(), cards: card.id ? [card.id] : [] });
  }

  return { words, cards, topics: DEFAULT_TOPICS };
};
