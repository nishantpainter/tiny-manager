import React from "react";
import { Link } from "react-router-dom";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const AppBar = withStyles((theme) => ({
  root: {
    boxShadow: theme.custom.shadow[0],
  },
}))(MuiAppBar);

const useStyles = makeStyles({
  title: { flexGrow: 1 },
});

function Topbar() {
  const classes = useStyles();
  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Typography className={classes.title}>Tiny Manager</Typography>
        <Button color="primary" size="large" component={Link} to="/">
          Home
        </Button>
        &nbsp;
        <Button color="primary" size="large" component={Link} to="/projects">
          Projects
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
