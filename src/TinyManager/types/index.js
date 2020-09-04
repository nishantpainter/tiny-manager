import PropTypes from "prop-types";

const project = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

const task = {
  id: PropTypes.string,
  title: PropTypes.string,
  note: PropTypes.string,
};

export default {
  project,
  task,
};
