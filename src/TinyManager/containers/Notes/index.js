import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash.debounce";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import DownloadIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/DeleteForever";

import Loader from "TinyManager/components/Loader";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    overflow: "hidden",
    flexDirection: "column",
    flex: 1,
  },
  action: {
    marginBottom: theme.spacing(1),
  },
  input: {
    display: "flex",
    overflow: "auto",
    flex: 1,
  },
  inputRoot: {
    flex: 1,
  },
  inputControl: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  caption: {
    display: "block",
    textAlign: "right",
    marginTop: theme.spacing(1),
  },
}));

function Notes() {
  const classes = useStyles();

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const handleUpdateStorage = useMemo(
    () => debounce(TinyManagerAPI.updateNotes, 150),
    []
  );

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      setNotes(value);
      handleUpdateStorage(value);
    },
    [handleUpdateStorage]
  );

  const handleDownloadNote = useCallback(() => {
    const url = window.URL.createObjectURL(new Blob([notes]), {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Notes.txt");
    link.click();
  }, [notes]);

  const handleClearNote = useCallback(() => {
    handleChange({ target: { value: "" } });
  }, [handleChange]);

  const handleKeyDown = useCallback(
    (event) => {
      const isSave = event.key === "s" && event.ctrlKey === true;
      if (isSave) {
        event.preventDefault();
        handleDownloadNote();
      }
    },
    [handleDownloadNote]
  );

  useEffect(() => {
    const notes = TinyManagerAPI.fetchNotes();
    if (notes) {
      setNotes(notes);
    }
    setLoading(false);
  }, []);

  return (
    <div className={classes.container}>
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
      <div className={classes.input}>
        <TextField
          classes={{
            root: classes.inputRoot,
          }}
          InputProps={{
            classes: {
              root: classes.inputControl,
            },
          }}
          inputProps={{
            style: { overflow: "auto" },
          }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={notes}
          placeholder="You can enter your notes here..."
          multiline
          fullWidth
          autoFocus
        />
      </div>
      <Typography
        className={classes.caption}
        color="textSecondary"
        variant="caption"
      >
        *Notes will be stored locally on the browser and will be persisted.
      </Typography>
    </div>
  );
}

export default Notes;
