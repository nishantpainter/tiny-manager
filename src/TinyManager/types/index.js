import PropTypes from "prop-types";

export const ProjectType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
});

export const TaskType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  note: PropTypes.string,
});

export const TodoType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
});

export default {
  ProjectType,
  TaskType,
  TodoType,
};
