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
  selectedWord?: TWord;
  handleCloseModal: () => void;
  handleSaveClick: (word: TWord) => void;
  handleRemoveClick: () => void;
};

const WordDialogForm: React.FC<Props> = (props) => {
  // OPTIMIZE: instead of just disabling the save button when the word is invalid we should display some validation feedback on the form
  const { isOpened, handleCloseModal, handleSaveClick, handleRemoveClick, selectedWord } = props;

  const [word, setWord] = React.useState<TWord | undefined>(undefined);

  /** Resets the local `word` whenever a new selected word is passed */
  React.useEffect(() => {
    setWord(selectedWord);

    return () => {
      setWord(undefined);
    };
  }, [selectedWord]);

  const onConceptChange = (concept: string) => {
    if (word) {
      setWord({ ...word, concept });
    }
  };

  const onDefinitionChange = (definition: string) => {
    if (word) {
      word && setWord({ ...word, definition });
    }
  };

  const onSave = () => {
    if (word) {
      // NOTES: after this call the modal is immediately closed by the parent, we do not wait until the word is saved.
      handleSaveClick(word);
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
  }, [word]);

  const wordIsNew = React.useMemo(() => word && !word.id, [word]);
  const wordIsInvalid = React.useMemo(() => !(word && word.concept && word.definition), [word]);

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
          <Button onClick={handleCloseModal} color="default">
            Cancel
          </Button>
          {wordIsNew ? null : (
            <Button onClick={handleRemoveClick} color="secondary">
              Remove
            </Button>
          )}
          <Button onClick={onSave} color="primary" disabled={wordIsInvalid}>
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
