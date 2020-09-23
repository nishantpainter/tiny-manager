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

  const [{ id, note }, setNote] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const handleUpdateStorage = React.useMemo(
    () => debounce(TinyManagerAPI.updateNote, 150),
    []
  );

  const handleChange = React.useCallback(
    (e) => {
      const { value } = e.target;
      setNote((store) => ({ ...store, note: value }));
      handleUpdateStorage({ id, note: value });
    },
    [id, handleUpdateStorage]
  );

  React.useEffect(() => {
    TinyManagerAPI.fetchNote()
      .then((notes) => {
        setNote(notes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
          color="primary"
          size="small"
          title="Download Note"
        >
          <DownloadIcon />
        </IconButton>
        <IconButton disabled={loading} size="small" title="Clear Note">
          <ClearIcon />
        </IconButton>
      </Box>
      <TextField
        disabled={loading}
        onChange={handleChange}
        value={note}
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
