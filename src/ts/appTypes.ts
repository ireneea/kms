import { Moment } from "moment";

export type TWord = {
  id?: string;
  concept: string;
  definition: string;
  example?: string;
  cards?: string[];
};

export type TCard = {
  id?: string;
  dueDate: Moment;
  front: string;
  back: string;
  wordId?: string;
};

export enum Answer {
  SKIP,
  DON_T_KNOW,
  LITTLE_BIT,
  WELL,
  VERY_WELL,
}

export type TSpacedRepetitionConfig = {};
