import _take from "lodash/take";
import { v4 as uuidv4 } from "uuid";

import { TWord, TCard, TTopic } from "../ts/appTypes";
import { saveCards, saveWords, fetchWords, fetchCards, fetchTopics } from "./wordsLocalStorage";

import { generateNewCard } from "./generateData";

type EndPoint<T> = {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | undefined>;
  create: (data: T) => Promise<T[]>;
  update: (data: T) => Promise<T[]>;
  delete: (data: T) => Promise<T[]>;
};

/** Words */
const WordsApi: EndPoint<TWord> = {
  /**
   *
   */
  getAll: (): Promise<TWord[]> => fetchWords(),

  /**
   *
   */
  getById: async (id: string): Promise<TWord | undefined> => {
    const words = await fetchWords();
    return words.find((w) => w.id === id);
  },

  /**
   *
   */
  create: async (word: TWord): Promise<TWord[]> => {
    const rnd = Math.random() * 10;
    if (rnd <= 3) {
      throw new Error("[Testing random backend error]");
    }

    const newWord = { ...word, id: uuidv4() };
    const card = generateNewCard(word);
    newWord.cards = card.id ? [card.id] : [];

    let words = await fetchWords();
    words = [newWord, ...words];
    saveWords(words);

    let cards = await fetchCards();
    cards = [card, ...cards];
    saveCards(cards);
    return words;
  },

  /**
   *
   */
  update: async (word: TWord): Promise<TWord[]> => {
    let words = await fetchWords();
    words = words.map((currentWord) => {
      let res;
      if (currentWord.id === word.id) {
        res = word;
      } else {
        res = currentWord;
      }
      return res;
    });
    saveWords(words);

    return words;
  },

  /**
   *
   */
  delete: async (word: TWord) => {
    let words = await fetchWords();
    words = words.filter((w) => w.id !== word.id);
    saveWords(words);
    return words;
  },
};

/** Cards */
const CardsApi: EndPoint<TCard> = {
  getAll: async (): Promise<TCard[]> => fetchCards(),
  getById: async (id: string): Promise<TCard | undefined> => {
    return undefined;
  },
  create: async (data: TCard): Promise<TCard[]> => {
    return [];
  },
  update: async (data: TCard): Promise<TCard[]> => {
    return [];
  },
  delete: async (data: TCard): Promise<TCard[]> => {
    return [];
  },
};

/** Topics */
export const TopicsAPI: EndPoint<TTopic> = {
  getAll: async (): Promise<TTopic[]> => fetchTopics(),
  getById: async (id: string): Promise<TTopic | undefined> => {
    return undefined;
  },
  create: async (data: TTopic): Promise<TTopic[]> => {
    return [];
  },
  update: async (data: TTopic): Promise<TTopic[]> => {
    return [];
  },
  delete: async (data: TTopic): Promise<TTopic[]> => {
    return [];
  },
};

// const CardsApi: EndPoint<TCard> = {
//   getAll: async (): Promise<TCard[]> => {
//     return [];
//   },
//   getById: async (id: string): Promise<TCard | undefined> => {
//     return undefined;
//   },
//   create: async (data: TCard): Promise<TCard[]> => {
//     return [];
//   },
//   update: async (data: TCard): Promise<TCard[]> => {
//     return [];
//   },
//   delete: async (data: TCard): Promise<TCard[]> => {
//     return [];
//   },
// };

export const getAllWords = WordsApi.getAll;
export const getById = WordsApi.getById;
export const addWord = WordsApi.create;
export const updateWord = WordsApi.update;
export const deleteWord = WordsApi.delete;

export const getAllCards = CardsApi.getAll;

export const getCards = async (limit: number = 10): Promise<TCard[]> => {
  const cards = await CardsApi.getAll();
  const subset = _take(cards, limit);
  return subset;
};
