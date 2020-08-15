import { TWord, TCard, TTopic } from "../ts/appTypes";
import { generateData } from "./generateData";

export const fetchWords = async (): Promise<TWord[]> => fetchByKey("words");
export const fetchCards = async (): Promise<TCard[]> => fetchByKey("cards");
export const fetchTopics = async (): Promise<TTopic[]> => fetchByKey("topics");

export const saveWords = (words: TWord[]) => saveByKey("words", words);
export const saveCards = (cards: TCard[]) => saveByKey("cards", cards);
export const saveTopics = (topics: TTopic[]) => saveByKey("topics", topics);

const initialiseStorage = () => {
  const { words, cards, topics } = generateData();

  saveWords(words);
  saveCards(cards);
  saveTopics(topics);
};

const fetchByKey = async (key: string) => {
  if (!window.localStorage.getItem(key)) {
    initialiseStorage();
  }

  let data = [];
  const storage = window.localStorage.getItem(key);
  if (storage) {
    data = JSON.parse(storage);
  }

  await sleep(200);
  return data;
};

function sleep(ms: number, errorPercentage: number = 5) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 100;
      if (rnd <= errorPercentage) {
        const err = new Error("[Testing random backend error]");
        reject(err);
      } else {
        resolve();
      }
    }, ms);
  });
}

const saveByKey = (key: string, data: any) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};
