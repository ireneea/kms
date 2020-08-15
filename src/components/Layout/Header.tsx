import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";

import { DRAWER_WIDTH } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      borderBottomWidth: 1,
      borderBottom: "solid",
      borderBottomColor: theme.palette.grey["300"],
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
    },
  })
);

type Prop = {
  /** we need to shift our app bar to the left when the `NavigationDrawer` is Opened */
  shiftLeft: boolean;
  /** function called whenever the search input changes */
  handleSearchChange: (searchText: string) => void;
  /** value of the controlled input search */
  searchText: string;
};

const Header: React.FC<Prop> = (props) => {
  const classes = useStyles();

  const { shiftLeft, searchText, handleSearchChange } = props;

  const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleSearchChange(value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: shiftLeft,
        })}
        elevation={0}
      >
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={onSearchTextChange}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
