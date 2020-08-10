import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { Severity } from "../../ts/appTypes";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

type Props = {
  isOpened: boolean;
  message: string;
  handleClose: () => void;
  severity: Severity;
};

const AppProcessFeedback: React.FC<Props> = (props) => {
  const { isOpened, message, handleClose, severity } = props;
  const onClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    handleClose();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={isOpened}
        autoHideDuration={2000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AppProcessFeedback;
