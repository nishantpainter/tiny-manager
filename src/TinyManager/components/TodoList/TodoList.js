import React from "react";
import PropTypes from "prop-types";
import { List, Typography } from "@material-ui/core";

import Todo from "../Todo";

function TodoList(props) {
  const { todos, onTodoClick } = props;

  if (todos.length === 0) {
    return <Typography>Nothing to be completed. Enjoy your day.</Typography>;
  }

  return (
    <List>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
          onClick={onTodoClick}
        />
      ))}
    </List>
  );
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool,
    })
  ),
};

TodoList.defaultProps = {
  todos: [],
  onTodoClick: () => {},
};

export default TodoList;
