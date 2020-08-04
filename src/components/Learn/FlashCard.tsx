import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

import { Answer } from "../../ts/appTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    definition: {
      paddingTop: theme.spacing(2),
      minHeight: 70,
    },
  })
);

type Props = {
  showBack?: boolean;
  onShowBack: () => void;
  onAnswer: (answer: Answer) => void;
  front: string;
  back: string;
};

const FlashCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { front, back, showBack, onShowBack, onAnswer } = props;

  const renderAnswerButtons = () => {
    return (
      <>
        <Button size="small" onClick={() => onAnswer(Answer.DON_T_KNOW)} color="secondary">
          Don't Know
        </Button>
        <Button size="small" onClick={() => onAnswer(Answer.LITTLE_BIT)}>
          A little bit
        </Button>
        <Button size="small" onClick={() => onAnswer(Answer.WELL)}>
          Well
        </Button>
        <Button size="small" onClick={() => onAnswer(Answer.VERY_WELL)} color="primary">
          Very well
        </Button>
      </>
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {front}
        </Typography>
        {showBack ? (
          <Typography variant="body2" component="p" className={classes.definition}>
            {back}
          </Typography>
        ) : (
          <Skeleton animation={false} height={70} />
        )}
      </CardContent>
      <CardActions>
        {showBack ? (
          renderAnswerButtons()
        ) : (
          <Button size="small" onClick={onShowBack}>
            Show Definition
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default FlashCard;
