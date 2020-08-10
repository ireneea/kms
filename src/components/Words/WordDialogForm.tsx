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
  word?: TWord;
  handleCloseModal: () => void;
  handleSaveClick: () => void;
  handleWordChange: (word: TWord) => void;
};

const WordDialogForm: React.FC<Props> = (props) => {
  // TODO: validation
  const { isOpened, handleCloseModal, handleSaveClick, handleWordChange, word } = props;

  const onConceptChange = (concept: string) => {
    if (word) {
      handleWordChange({ ...word, concept });
    }
  };

  const onDefinitionChange = (definition: string) => {
    if (word) {
      word && handleWordChange({ ...word, definition });
    }
  };

  const title = React.useMemo(() => {
    let formTitle = "Word";
    if (word) {
      if (word.id) {
        formTitle = "Update Word";
      } else {
        formTitle = "Add New Word";
      }
    }
    return formTitle;
  }, [word?.id]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog open={isOpened} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <WordForm
            concept={word?.concept || ""}
            definition={word?.definition || ""}
            onConceptChange={onConceptChange}
            onDefinitionChange={onDefinitionChange}
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

type WordFormProps = {
  concept: string;
  definition: string;
  onConceptChange: (concept: string) => void;
  onDefinitionChange: (definition: string) => void;
};

const WordForm: React.FC<WordFormProps> = (props) => {
  const { concept, definition, onConceptChange, onDefinitionChange } = props;

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="concept"
        name="concept"
        label="Word"
        fullWidth
        value={concept}
        onChange={(e) => onConceptChange(e.target.value)}
      />
      <TextField
        margin="dense"
        id="definition"
        name="definition"
        label="Definition"
        fullWidth
        multiline
        value={definition}
        onChange={(e) => onDefinitionChange(e.target.value)}
      />
    </>
  );
};

export default WordDialogForm;
