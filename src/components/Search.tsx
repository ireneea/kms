import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

type Prop = {
  onChange: (value: string) => void;
  searchText: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    searchIcon: {
      // padding: 10,
      justifyContent: "center",
      height: "100%",
      color: theme.palette.text.secondary,
    },
  })
);

export default function CustomizedInputBase(props: Prop) {
  const classes = useStyles();

  const { searchText, onChange } = props;

  return (
    <Paper className={classes.root}>
      <SearchIcon className={classes.searchIcon} />
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={searchText}
        onChange={(event) => onChange(event.target.value)}
      />
    </Paper>
  );
}
