import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Header from "./Header";
import NavigationDrawer from "./NavigationDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    offset: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

type Prop = {};

const Page: React.FC<Prop> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header shiftLeft={true} />
      <NavigationDrawer />
      <main className={classes.content}>
        <div className={classes.offset} />
        {props.children}
      </main>
    </div>
  );
};

export default Page;
