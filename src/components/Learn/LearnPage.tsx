import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Page from "../Page/Page";

type Prop = {};

const LearnPage: React.FC<Prop> = () => {
  return (
    <Page>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            LearnScreen
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default LearnPage;
