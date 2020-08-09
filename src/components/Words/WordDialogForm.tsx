import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TWord } from "../../ts/appTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

type Props = {
  isOpened: boolean;
  word: TWord;
  handleCloseModal: () => void;
  handleSaveClick: () => void;
  handleWordChange: (word: TWord) => void;
};

const WordDialogForm: React.FC<Props> = (props) => {
  // TODO: validation
  const { isOpened, handleCloseModal, handleSaveClick, handleWordChange, word } = props;

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    const nextWord = { ...word };

    if (name === "concept") {
      nextWord.concept = value;
    } else if (name === "definition") {
      nextWord.definition = value;
    }

    handleWordChange(nextWord);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog open={isOpened} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Word</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="concept"
            name="concept"
            label="Word"
            fullWidth
            value={word.concept}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            id="definition"
            name="definition"
            label="Definition"
            fullWidth
            multiline
            value={word.definition}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WordDialogForm;
