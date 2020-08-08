import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Answer, TCard } from "../../ts/appTypes";
import useApiCall from "../../hooks/useApiCall";
import { getCards } from "../../api/words";

import FlashCard from "./FlashCard";
import CongratulationCard from "./CongratulationCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const PRACTICE_SIZE = 2;

type Prop = {};

/**
 * `LearnPage` Displays a list of the concepts to learn
 */
const LearnPage: React.FC<Prop> = () => {
  const classes = useStyles();

  const [showDefinition, setShowDefinition] = React.useState(false);
  const [cards, setCards] = React.useState((): TCard[] => []);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  // TODO: handle game over
  const [gameOver, setGameOver] = React.useState(false);

  // OPTIMIZE: add a loading indicator
  // OPTIMIZE: handle error gracefully
  const { isLoading: isApiLoading, callApi } = useApiCall();

  React.useEffect(() => {
    callApi(load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setGameOver(false);
    setCurrentCardIndex(0);
  }, [cards]);

  React.useEffect(() => {
    setShowDefinition(false);
  }, [currentCardIndex]);

  const onShowDefinition = () => {
    setShowDefinition(true);
  };

  const onAnswer = (answer: Answer) => {
    if (currentCardIndex === cards.length - 1) {
      setGameOver(true);
    } else {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const onPracticeMore = () => {
    callApi(load);
  };

  const load = async () => {
    const data = await getCards(PRACTICE_SIZE);
    setCards(data);
  };

  const getCurrentCard = (): TCard | undefined => {
    let card;
    if (cards.length > 0 && cards.length > currentCardIndex) {
      card = cards[currentCardIndex];
    }
    return card;
  };

  const currentCard = getCurrentCard();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {currentCard && !gameOver ? (
            <FlashCard
              front={currentCard.front}
              back={currentCard.back}
              onShowBack={onShowDefinition}
              showBack={showDefinition}
              onAnswer={onAnswer}
            />
          ) : null}
          {gameOver && !isApiLoading ? (
            <CongratulationCard onPracticeMore={onPracticeMore} words={cards.length} />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LearnPage;
