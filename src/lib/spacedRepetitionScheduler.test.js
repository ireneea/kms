import moment from "moment";
import { getNextDueDate } from "./spacedRepetitionScheduler";
import { Answer } from "../ts/appTypes";

describe("spacedRepetitionScheduler", () => {
  describe("calculateNextDueDate", () => {
    // based on the current due date and the answer, a new due date should be calculated
    // there should be three types of answer allowed
    // - Skip
    // - Don't know
    // - A little bit
    // - well
    // - Very well

    it("The due date should be the same when the question is skipped", () => {
      const days = [-10, -2, -1, 0, 1, 2, 10];
      days.forEach((days) => {
        const card = {
          dueDate: moment().add(days, "days"),
        };

        const dueDate = getNextDueDate(card, Answer.SKIP);
        expect(dueDate.isSame(card.dueDate, "day")).toBe(true);
      });
    });

    it("Due date should be now for Don't know", () => {
      const days = [-10, -2, -1, 0, 1, 2, 10];
      days.forEach((days) => {
        const card = {
          dueDate: moment().add(days, "days"),
        };

        const dueDate = getNextDueDate(card, Answer.DON_T_KNOW);
        expect(dueDate.isSame(moment(), "day")).toBe(true);
      });
    });

    it("Due date should be tomorrow for `A little bit`", () => {
      const days = [-10, -2, -1, 0, 1, 2, 10];
      days.forEach((days) => {
        const card = {
          dueDate: moment().add(days, "days"),
        };

        const dueDate = getNextDueDate(card, Answer.LITTLE_BIT);
        const tomorrow = moment().add(1, "days");
        expect(dueDate.isSame(tomorrow, "day")).toBe(true);
      });
    });

    it("Due date should be in two days for `Well`", () => {
      const days = [-10, -2, -1, 0, 1, 2, 10];
      days.forEach((days) => {
        const card = {
          dueDate: moment().add(days, "days"),
        };

        const dueDate = getNextDueDate(card, Answer.WELL);
        const tomorrow = moment().add(2, "days");
        expect(dueDate.isSame(tomorrow, "day")).toBe(true);
      });
    });

    it("Due date should be in two days for `Very Well`", () => {
      const days = [-10, -2, -1, 0, 1, 2, 10];
      days.forEach((days) => {
        const card = {
          dueDate: moment().add(days, "days"),
        };

        const dueDate = getNextDueDate(card, Answer.VERY_WELL);
        const tomorrow = moment().add(3, "days");
        expect(dueDate.isSame(tomorrow, "day")).toBe(true);
      });
    });
  });

  it("should do something", () => {});
});
