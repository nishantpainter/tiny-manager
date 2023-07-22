import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MuiLink from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "TinyManager/components/IconButton";
import { identity } from "TinyManager/components/utils";
import ListIcon from "@material-ui/icons/List";

const AppBar = withStyles((theme) => ({
  root: {
    boxShadow: theme.custom.shadow[0],
  },
}))(MuiAppBar);

const useStyles = makeStyles((theme) => ({
  title: { flexGrow: 1, cursor: "pointer" },
  icon: {
    color: theme.palette.primary.main,
  },
}));

function DarkThemeButton(props) {
  const { onClick } = props;
  return (
    <IconButton
      icon="invertColors"
      size="small"
      color="primary"
      onClick={onClick}
    ></IconButton>
  );
}

DarkThemeButton.propTypes = {
  onClick: PropTypes.func,
};

function GithubIconButton() {
  return (
    <IconButton
      color="inherit"
      icon="github"
      component={MuiLink}
      href="https://github.com/nishantpainter/tiny-manager"
      target="_blank"
    />
  );
}

function LanguageSelection(props) {
  const { languages, onChange } = props;

  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const openLanguageSelection = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const closeLanguageSelection = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (language) => (event) => {
    if (onChange) {
      onChange(event, language);
      closeLanguageSelection();
    }
  };

  return (
    <>
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
        {languages.map(({ value, label }) => (
          <MenuItem onClick={handleLanguageChange(value)} key={value}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

LanguageSelection.propTypes = {
  languages: PropTypes.array,
  onChange: PropTypes.func,
};

LanguageSelection.defaultProps = {
  languages: [],
};

function Topbar(props) {
  const {
    onToggleDarkMode,
    languages = [],
    onlanguageChange,
    translate,
  } = props;

  const classes = useStyles();

  return (
    <>
      <AppBar color="default">
        <Toolbar variant="dense">
          <Box display="flex" alignItems="center">
            <Box component={ListIcon} mr={1} className={classes.icon} />
            <Typography className={classes.title} component={Link} to="/">
              <b>{translate("Tiny Manager")}</b>&nbsp;
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Button color="primary" size="large" component={Link} to="/">
            {translate("Home")}
          </Button>
          &nbsp;
          <Button color="primary" size="large" component={Link} to="/projects">
            {translate("Projects")}
          </Button>
          <DarkThemeButton onClick={onToggleDarkMode} />
          &nbsp;
          <LanguageSelection
            languages={languages}
            onChange={onlanguageChange}
          />
          &nbsp;
          <GithubIconButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

Topbar.propTypes = {
  onToggleDarkMode: PropTypes.func,
  onlanguageChange: PropTypes.func,
  languages: PropTypes.array,
  translate: PropTypes.func,
};

Topbar.defaultProps = {
  translate: identity,
};

export default Topbar;
