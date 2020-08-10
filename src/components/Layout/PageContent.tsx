import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

type Props = {};

const PageContent: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PageContent;
