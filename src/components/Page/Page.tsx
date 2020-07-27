import React from "react";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Header from "./Header";
import ListItemLink from "../shared/ListItemLink";

import { DRAWER_WIDTH } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

type Prop = {};

const Page: React.FC<Prop> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onMenuClick={handleDrawerOpen} hideMenuIcon={open} />
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink to="/words" primary="Words" />
          <ListItemLink to="/learn" primary="Learn" />
        </List>
      </Drawer>
      <main>{props.children}</main>
    </>
  );
};

export default Page;
