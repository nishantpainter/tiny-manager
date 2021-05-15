import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash.debounce";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import jsPDF from "jspdf";

import DownloadIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/DeleteForever";

import Loader from "TinyManager/components/Loader";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import { useTranslation } from "TinyManager/providers/TranslationProvider";
import { formatDate } from "TinyManager/services/Utils";

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
  const { t } = useTranslation();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleUpdateStorage = useMemo(
    () => debounce(TinyManagerAPI.updateNotes, 150),
    []
  );

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;
      setNotes(value);
      handleUpdateStorage(value);
    },
    [handleUpdateStorage]
  );

  const getFileName = useCallback((extension) => {
    return `Note-${formatDate()}.${extension}`;
  }, []);

  const handleDownloadNoteTxt = useCallback(() => {
    const url = window.URL.createObjectURL(new Blob([notes]), {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", getFileName("txt"));
    link.click();
  }, [notes, getFileName]);

  const handleDownloadNotePdf = useCallback(() => {
    const doc = new jsPDF();
    doc.text(notes, 10, 10);
    doc.save(getFileName("pdf"));
  }, [notes, getFileName]);

  const handleClearNote = useCallback(() => {
    handleChange({ target: { value: "" } });
  }, [handleChange]);

  const handleKeyDown = useCallback(
    (event) => {
      const isSave = event.key === "s" && event.ctrlKey === true;
      if (isSave) {
        event.preventDefault();
        handleDownloadNoteTxt();
      }
    },
    [handleDownloadNoteTxt]
  );

  const handleOpenMenu = useCallback((event) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);

  const handleMenuAction = useCallback(
    (cb) => (event) => {
      handleCloseMenu();
      cb(event);
    },
    [handleCloseMenu]
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
          onClick={handleOpenMenu}
          color="primary"
          size="small"
          title={t("Download Note")}
        >
          <DownloadIcon />
        </IconButton>
        <IconButton
          disabled={loading}
          onClick={handleClearNote}
          size="small"
          title={t("Clear Note")}
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
          placeholder={t("You can enter your notes here...")}
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
        *
        {t(
          "Notes will be stored locally on the browser and will be persisted."
        )}
      </Typography>
      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleMenuAction(handleDownloadNoteTxt)}>
          {t("TXT")}
        </MenuItem>
        <MenuItem onClick={handleMenuAction(handleDownloadNotePdf)}>
          {t("PDF")}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Notes;
