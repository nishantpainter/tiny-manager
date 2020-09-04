import PropTypes from "prop-types";

const Project = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
});

const Task = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  note: PropTypes.string,
});

const Todo = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
});

export default {
  Project,
  Task,
  Todo,
};
