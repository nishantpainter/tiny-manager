import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Typography, IconButton } from "@material-ui/core";
import {
  SaveAlt as DownloadIcon,
  DeleteForever as ClearIcon,
} from "@material-ui/icons";
import debounce from "lodash.debounce";

import Loader from "TinyManager/components/Loader";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  action: {
    marginBottom: theme.spacing(1),
  },
  caption: {
    display: "block",
    textAlign: "right",
    marginTop: theme.spacing(1),
  },
}));

function Notes() {
  const classes = useStyles();

  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const handleUpdateStorage = React.useMemo(
    () => debounce(TinyManagerAPI.updateNotes, 150),
    []
  );

  const handleChange = React.useCallback(
    (e) => {
      const { value } = e.target;
      setNotes(value);
      handleUpdateStorage(value);
    },
    [handleUpdateStorage]
  );

  const handleDownloadNote = React.useCallback(() => {
    const url = window.URL.createObjectURL(new Blob([notes]), {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Notes.txt");
    link.click();
  }, [notes]);

  const handleClearNote = React.useCallback(() => {
    handleChange({ target: { value: "" } });
  }, [handleChange]);

  React.useEffect(() => {
    const notes = TinyManagerAPI.fetchNotes();
    if (notes) {
      setNotes(notes);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Box
        className={classes.action}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        {loading && (
          <IconButton>
            <Loader />
          </IconButton>
        )}
        <IconButton
          disabled={loading}
          onClick={handleDownloadNote}
          color="primary"
          size="small"
          title="Download Note"
        >
          <DownloadIcon />
        </IconButton>
        <IconButton
          disabled={loading}
          onClick={handleClearNote}
          size="small"
          title="Clear Note"
        >
          <ClearIcon />
        </IconButton>
      </Box>
      <TextField
        onChange={handleChange}
        value={notes}
        rows={20}
        rowsMax={20}
        placeholder="You can enter your notes here..."
        multiline
        fullWidth
        autoFocus
      />
      <Typography
        className={classes.caption}
        color="textSecondary"
        variant="caption"
      >
        *Notes will be stored locally on the browser and will be persisted.
      </Typography>
    </>
  );
}

export default Notes;
