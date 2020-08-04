import moment from "moment";
import { TCard, Answer } from "../ts/appTypes";

export const getNextDueDate = (card: TCard, answer: Answer): moment.Moment => {
  let dueDate;
  if (answer === Answer.DON_T_KNOW) {
    dueDate = moment();
  } else if (answer === Answer.LITTLE_BIT) {
    dueDate = moment().add(1, "days");
  } else if (answer === Answer.WELL) {
    dueDate = moment().add(2, "days");
  } else if (answer === Answer.VERY_WELL) {
    dueDate = moment().add(3, "days");
  } else {
    dueDate = card.dueDate.clone();
  }

  return dueDate;
};
