import PropTypes from "prop-types";
import MuiPaper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const Paper = withStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: theme.custom.shadow[0],
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(),
    height: theme.spacing(15),
  },
}))(MuiPaper);

Paper.displayName = "Paper";

Paper.propTypes = {
  className: PropTypes.string,
};

export default Paper;
