import { Moment } from "moment";

export type TWord = {
  id: string;
  concept: string;
  definition: string;
  example?: string;
};

export type TCard = {
  dueDate: Moment;
};

export enum Answer {
  SKIP,
  DON_T_KNOW,
  LITTLE_BIT,
  WELL,
  VERY_WELL,
}

export type TSpacedRepetitionConfig = {};
