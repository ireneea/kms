import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    icon: {
      fontSize: 80,
      color: "gold",
      textAlign: "center",
    },
    cardContent: {
      textAlign: "center",
    },
  })
);

type Props = {
  onPracticeMore: () => void;
  words: number;
};

const CongratulationCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { onPracticeMore, words } = props;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <EmojiEventsIcon className={classes.icon} />
        <Alert severity="success">Congratulations you have practised {words} words</Alert>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onPracticeMore}>
          Practice more
        </Button>
      </CardActions>
    </Card>
  );
};

export default CongratulationCard;
