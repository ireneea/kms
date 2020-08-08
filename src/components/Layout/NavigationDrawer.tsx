import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";

import ListItemLink from "../shared/ListItemLink";

import { DRAWER_WIDTH } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    username: {
      paddingLeft: theme.spacing(2),
    },
  })
);

type Props = {
  onAddWord: () => void;
};

const DeleteWord: React.FC<{}> = (props) => <>hi</>;

const NavigationDrawer: React.FC<Props> = ({ onAddWord }) => {
  const classes = useStyles();

  const addWord = {
    actionName: "add word",
    onClick: onAddWord,
    icon: <AddIcon />,
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Avatar className={classes.purple}>I</Avatar>
        <Typography variant="overline" display="block" className={classes.username}>
          Irenee
        </Typography>
      </div>
      <List>
        <ListItemLink to="/words" primary="Words" secondaryAction={addWord} />
        <ListItemLink to="/learn" primary="Learn" />
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;
