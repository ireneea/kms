import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { TWord } from "../../ts/appTypes";
import LinkRouter from "../shared/LinkRouter";

import { getById as getWordById } from "../../api/words";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    margin: theme.spacing(2, 0),
  },
  wordCard: {
    minWidth: 275,
  },
  definition: {
    marginTop: 12,
  },
}));

type Prop = {
  id: string;
};

const WordDetailsPage: React.FC<RouteComponentProps<Prop>> = (props) => {
  // OPTIMIZE: pass the word inside tha router state
  const classes = useStyles();
  const id = props.match.params.id;

  const [word, setWord] = React.useState((): TWord | undefined => undefined);

  React.useEffect(() => {
    const loadWords = async () => {
      // OPTIMIZE: handle error
      const data = await getWordById(id);
      setWord(data);
    };

    loadWords();
  }, [id]);

  return (
    <Container maxWidth="md">
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <LinkRouter color="inherit" to="/">
          Words
        </LinkRouter>
        <LinkRouter color="textPrimary" to="/">
          {word?.concept}
        </LinkRouter>
      </Breadcrumbs>
      <Card className={classes.wordCard}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {word?.concept}
          </Typography>
          <Typography variant="body2" component="p" className={classes.definition}>
            {word?.definition}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default WordDetailsPage;
