import React from "react";
import { Link } from "react-router-dom";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ToggleDarkThemeIcon from "@material-ui/icons/InvertColors";

const AppBar = withStyles((theme) => ({
  root: {
    boxShadow: theme.custom.shadow[0],
  },
}))(MuiAppBar);

const useStyles = makeStyles({
  title: { flexGrow: 1, cursor: "pointer" },
});

function Topbar(props) {
  const classes = useStyles();
  const { onToggleDarkMode } = props;
  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Typography className={classes.title} component={Link} to="/">
          Tiny Manager
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

export default Topbar;
