import { TWord, TCard } from "../ts/appTypes";
import { generateData } from "./generateData";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const throwsErrorRandomly = (percent: number = 5) => {
  const rnd = Math.random() * 100;
  if (rnd <= percent) {
    throw new Error("[Testing random backend error]");
  }
};

const initialiseStorage = () => {
  const { words, cards } = generateData();

  saveWords(words);
  saveCards(cards);
};

const fetchByKey = (key: string) => {
  if (!window.localStorage.getItem(key)) {
    initialiseStorage();
  }

  let data = [];
  const storage = window.localStorage.getItem(key);
  if (storage) {
    data = JSON.parse(storage);
  }

  return data;
};

export const fetchWords = async (): Promise<TWord[]> => {
  await sleep(200);
  throwsErrorRandomly();
  return fetchByKey("words");
};

export const fetchCard = async (): Promise<TCard[]> => {
  await sleep(200);
  throwsErrorRandomly();
  return fetchByKey("cards");
};

export const saveWords = (words: TWord[]) => {
  window.localStorage.setItem("words", JSON.stringify(words));
};

export const saveCards = (cards: TCard[]) => {
  window.localStorage.setItem("cards", JSON.stringify(cards));
};
