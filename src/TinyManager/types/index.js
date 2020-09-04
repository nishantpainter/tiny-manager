import PropTypes from "prop-types";

const Project = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

const Task = {
  id: PropTypes.string,
  title: PropTypes.string,
  note: PropTypes.string,
};

export default {
  Project,
  Task,
};
