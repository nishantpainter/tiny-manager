import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import IconButton from "TinyManager/components/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const AppBar = withStyles((theme) => ({
  root: {
    boxShadow: theme.custom.shadow[0],
  },
}))(MuiAppBar);

const useStyles = makeStyles({
  title: { flexGrow: 1, cursor: "pointer" },
  logo: {
    fontSize: "1.25rem",
  },
});

function Topbar(props) {
  const { onToggleDarkMode, languages = [], onlanguageChange } = props;

  const classes = useStyles();

  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const openLanguageSelection = (event) => {
    setLanguageAnchorEl(event.currentTargets);
  };

  const closeLanguageSelection = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (language) => (event) => {
    onlanguageChange && onlanguageChange(event, language);
  };

  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Typography
          color="primary"
          className={classes.title}
          component={Link}
          to="/"
        >
          <span role="img" aria-label="Ant" className={classes.logo}>
            🐜
          </span>
          &nbsp;<b>Tiny Manager</b>
        </Typography>
        <Button color="primary" size="large" component={Link} to="/">
          Home
        </Button>
        &nbsp;
        <Button color="primary" size="large" component={Link} to="/projects">
          Projects
        </Button>
        &nbsp;
        <IconButton
          icon="invertColors"
          size="small"
          color="primary"
          onClick={onToggleDarkMode}
        ></IconButton>
        <IconButton
          icon="language"
          size="small"
          color="primary"
          onClick={openLanguageSelection}
          disabled={!languages.length}
        ></IconButton>
        <Menu
          id="language-selection"
          anchorEl={languageAnchorEl}
          keepMounted
          open={Boolean(languageAnchorEl)}
          onClose={closeLanguageSelection}
        >
          {languages.map((language) => (
            <MenuItem onClick={handleLanguageChange(language)} key={language}>
              {language}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  onToggleDarkMode: PropTypes.func,
  onlanguageChange: PropTypes.func,
  languages: PropTypes.array,
};

export default Topbar;
