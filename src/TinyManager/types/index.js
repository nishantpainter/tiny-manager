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

const Todo = {
  id: PropTypes.string,
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
};

export default {
  Project,
  Task,
  Todo,
};
