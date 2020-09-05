import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { InvertColors as ToggleDarkThemeIcon } from "@material-ui/icons";

const AppBar = withStyles((theme) => ({
  root: {
    boxShadow: theme.custom.shadow[0],
  },
}))(MuiAppBar);

const useStyles = makeStyles({
  title: { flexGrow: 1, cursor: "pointer" },
});

function Topbar(props) {
  const { onToggleDarkMode } = props;

  const classes = useStyles();
  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Typography className={classes.title} component={Link} to="/">
          <b>Tiny Manager</b>
        </Typography>
        <Button color="primary" size="large" component={Link} to="/">
          Home
        </Button>
        &nbsp;
        <Button color="primary" size="large" component={Link} to="/projects">
          Projects
        </Button>
        &nbsp;
        <IconButton size="small" color="primary" onClick={onToggleDarkMode}>
          <ToggleDarkThemeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  onToggleDarkMode: PropTypes.func,
};

export default Topbar;
