import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
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

function DownloadButton(props) {
  const { notes } = props;

  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuItemClick = useCallback(
    (cb) => (event) => {
      closeMenu();
      cb(event);
    },
    [closeMenu]
  );

  return (
    <>
      <IconButton
        onClick={openMenu}
        color="primary"
        size="small"
        title={t("Download Note")}
        disabled={!notes}
      >
        <DownloadIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleMenuItemClick(() => downloadTxt(notes))}>
          {t("TXT")}
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(() => downloadPdf(notes))}>
          {t("PDF")}
        </MenuItem>
      </Menu>
    </>
  );
}

DownloadButton.propTypes = {
  notes: PropTypes.string,
};

const updateStorageNotes = debounce(TinyManagerAPI.updateNotes, 150);

function fileName(extension = "txt") {
  return `Note-${formatDate()}.${extension}`;
}

function downloadTxt(string) {
  const url = window.URL.createObjectURL(new Blob([string]), {
    type: "text/plain",
  });

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName());
  link.click();
}

function downloadPdf(string) {
  new jsPDF().text(string, 10, 10).save(fileName("pdf"));
}

function Notes() {
  const classes = useStyles();
  const { t } = useTranslation();

  const [notes, setNotes] = useState(TinyManagerAPI.fetchNotes());

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    setNotes(value);
    updateStorageNotes(value);
  }, []);

  const handleClearNote = useCallback(() => {
    handleChange({ target: { value: "" } });
  }, [handleChange]);

  const handleKeyDown = useCallback(
    (event) => {
      const isSave = event.key === "s" && event.ctrlKey === true;
      if (isSave) {
        event.preventDefault();
        downloadTxt(notes);
      }
    },
    [notes]
  );

  return (
    <div className={classes.container}>
      <Box
        className={classes.action}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <DownloadButton notes={notes} />
        <IconButton
          disabled={!notes}
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
    </div>
  );
}

export default Notes;
