import PropTypes from "prop-types";

export const ProjectType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  description: PropTypes.string,
});

export const TaskType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  note: PropTypes.string,
  priority: PropTypes.number,
  progress: PropTypes.number,
});

export const TodoType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  completed: PropTypes.bool,
});

export default {
  ProjectType,
  TaskType,
  TodoType,
};
